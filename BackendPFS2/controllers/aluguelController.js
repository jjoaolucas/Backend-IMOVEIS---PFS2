import Database from "../db/database.js";
import AluguelEntity from "../entities/aluguelEntity.js";
import ContratoEntity from "../entities/contratoEntity.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";


export default class AluguelController {

    async listarPorUsuario(req, res) {

        try{
            let {idUsuario} = req.params;

            let aluguelRepo = new AluguelRepository();
            let lista = await aluguelRepo.listarPorUsuario(idUsuario);
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async locar(req, res) {
        let banco = new Database();
        await banco.AbreTransacao();
        try{

            let {idImovel} = req.params;
            let usuario = req.usuarioLogado;

            let repo = new ImovelRepository(banco);
            let imovel = await repo.obter(idImovel);
            if(imovel.disponivel == "S") {
                //gerar contrato
                let contrato = new ContratoEntity();
                contrato.usuario = usuario;
                contrato.imovel = imovel;
                let repoContrato = new ContratoRepository(banco);
                let ctrId = await repoContrato.gravar(contrato);
                if(ctrId) {
                    contrato.id = ctrId;
                    //gerar 12 parcelas de aluguel
                    let aluguelEntidade = new AluguelEntity();
                    let aluguelRepo = new AluguelRepository(banco);
                    for(let i = 0; i<12; i++) {
                        aluguelEntidade.pago = "N";
                        aluguelEntidade.contrato = contrato;
                        aluguelEntidade.valor = imovel.valor;
                        let data = new Date();
                        data.setMonth(data.getMonth() + i);
                        aluguelEntidade.mes = data.getMonth() + 1;
                        aluguelEntidade.vencimento = data;

                        if(await aluguelRepo.gravar(aluguelEntidade) == false)
                            throw new Error("Erro durante a inserção do aluguel no banco de dados!");
                    }

                    imovel.disponivel = "N";
                    if(await repo.atualizar(imovel)) {
                        await banco.Commit();
                        res.status(200).json(contrato);
                    }
                        
                    else
                        throw new Error("Erro ao atualizar o status do imóvel");
                }
                else {
                    throw new Error("Erro ao inserir o contrato no banco de dados!");
                }
            }
            else{
                res.status(400).json({msg: "Imóvel indisponível para locação!"});
            }
        }
        catch(ex) {
            await banco.Rollback();
            res.status(500).json({msg: ex.message});
        }
    }
}