import Database from "../db/database.js";
import AluguelEntity from "../entities/aluguelEntity.js";
import ContratoEntity from "../entities/contratoEntity.js";
import ImovelEntity from "../entities/imovelEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import BaseRepository from "./baseRepository.js";
import ImovelRepository from "./imovelRepository.js";
import UsuarioRepository from "./usuarioRepository.js";


export default class AluguelRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listarPorUsuario(idUsuario) {

        let sql = `select * from tb_aluguel a 
                    inner join tb_contrato c on a.ctr_id = c.ctr_id
                    inner join tb_imovel i on c.imv_id = i.imv_id
                    inner join tb_usuario u on c.usu_id = u.usu_id
                    where u.usu_id = ?`;

        let valores = [idUsuario];

        let rows = await this.db.ExecutaComando(sql, valores);

        return this.toMap(rows);
    }

    async gravar(entidade) {
        let sql = "insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) values (?, ?, ?, ?, ?)";

        let valores = [
            entidade.mes, 
            entidade.vencimento, 
            entidade.valor, 
            entidade.pago, 
            entidade.contrato.id
        ];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows) {

        
        let repoImovel = new ImovelRepository();
        let repoUsuario = new UsuarioRepository();
        if(typeof rows.length == "number") {
            let lista = [];
            for(let row of rows) {
                let aluguel = new AluguelEntity();
                aluguel.id = row["alu_id"];
                aluguel.mes = row["alu_mes"];
                aluguel.pago = row["alu_pago"];
                aluguel.vencimento = row["alu_vencimento"];
                aluguel.valor = row["alu_valor"];
                aluguel.contrato = new ContratoEntity();
                aluguel.contrato.id = row["ctr_id"];
                aluguel.contrato.imovel = repoImovel.toMap(row, false);
                aluguel.contrato.usuario = repoUsuario.toMap(row, false);
    
                lista.push(aluguel);
            }
    
        }
        else{
            let aluguel = new AluguelEntity();
            aluguel.id = rows["alu_id"];
            aluguel.mes = rows["alu_mes"];
            aluguel.pago = rows["alu_pago"];
            aluguel.vencimento = rows["alu_vencimento"];
            aluguel.valor = rows["alu_valor"];
            aluguel.contrato = new ContratoEntity();
            aluguel.contrato.id = rows["ctr_id"];
            aluguel.contrato.imovel = repoImovel.toMap(rows, false);
            aluguel.contrato.usuario = repoUsuario.toMap(rows, false);

            return aluguel;
        }
    }
}