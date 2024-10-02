import ImagemImovelEntity from "../entities/imagemImovelEntity.js";
import ImovelEntity from "../entities/imovelEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import ImovelRepository from "../repositories/imovelRepository.js";


export default class ImovelController {

    async listar(req, res) {
        try{
            let repo = new ImovelRepository();
            let lista = await repo.listar();
            if(lista && lista.length > 0)
                res.status(200).json(lista);
            else
                res.status(404).json({msg: "Nenhum imóvel encontrado!"});
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;
            let repo = new ImovelRepository();
            imovel = await repo.obter(id);
            if(imovel) {
                res.status(200).json(imovel);
            }
            else{
                res.status(404).json({msg: "Imóvel não encontrando"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async inserir(req, res) {
        try{
            let {descricao, endereco, bairro, cidade, cep, valor, disponivel} = req.body;
            if(descricao && endereco && bairro && cidade && cep && valor && disponivel) {

                let imagens = req.files;
                let imagensImovel = [];
                if(imagens) {
                    for(let imagem of imagens) {
                        let tipo = imagem.mimetype.split("/").pop();
                        let entidadeImagem = new ImagemImovelEntity();
                        entidadeImagem.tipo = tipo;
                        entidadeImagem.blob = imagem.buffer;
                        imagensImovel.push(entidadeImagem);

                    }
                }
                let entidade = new ImovelEntity(
                    0, 
                    descricao, 
                    cep, 
                    cidade, 
                    bairro, 
                    valor, 
                    disponivel, 
                    endereco,
                    imagensImovel
                );

                let repo = new ImovelRepository();
                let result = await repo.inserir(entidade);
                if(result) {
                    res.status(201).json({msg: "Imovel cadastrado!"});
                }
                else {            
                    throw new Error("Erro ao inserir imóvel no banco de dados");
                }
            }
            else{
                res.status(400).json({msg: "Parâmetros inválidos!"});
            }
        }
        catch(ex) {
            if(ex.insertImovel) {
                res.status(200).json({msg: ex.message});
            }
            else{
                res.status(500).json({msg: ex.message});
            }
            
        }
    }

    async atualizar(req, res) {
        try{
            let {id, descricao, endereco, bairro, cidade, cep, valor, disponivel } = req.body;
            if(id && descricao && endereco && bairro && cidade && cep && valor && disponivel) {
                
                let repo = new ImovelRepository();
                if(await repo.obter(id)) {
                    let entidade = new ImovelEntity();
                    entidade.id = id;
                    entidade.descricao = descricao;
                    entidade.endereco = endereco;
                    entidade.bairro = bairro;
                    entidade.cidade = cidade;
                    entidade.cep = cep;
                    entidade.valor = valor;
                    entidade.disponivel = disponivel;

                    let result = await repo.atualizar(entidade);

                    if(result)
                        res.status(200).json({msg: "Atualização realizada com sucesso!"});
                    else
                        throw new Error("Erro ao atualizar imóvel no banco de dados");
                }
                else{
                    res.status(404).json({msg: "Nenhum imóvel encontrado para alteração!"});
                }
            }
            else{
                res.status(400).json({msg: "Parâmetros inválidos"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            let repo = new ImovelRepository();
            let result = await repo.deletar(id);
            if(result)
                res.status(200).json({msg: "Imóvel deletado com sucesso!"});
            else
                throw new Error("Erro ao deletar imóvel do banco de dados");
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }
}