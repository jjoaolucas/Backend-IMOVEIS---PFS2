import BaseRepository from "./baseRepository.js";


export default class ContratoRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async gravar(entidade) {
        let sql = "insert into tb_contrato (imv_id, usu_id) values (?, ?)";
        let valores = [entidade.imovel.id, entidade.usuario.id];

        let result = await this.db.ExecutaComandoLastInserted(sql, valores);  

        return result;
    }
}