import ImovelEntity from "../entities/imovelEntity.js";
import ImovelErro from "../exceptions/imovelError.js";
import BaseRepository from "./baseRepository.js";


export default class ImovelRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {

        let sql = "select * from tb_imovel";
        let rows = await this.db.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async obter(id) {

        let sql = "select * from tb_imovel where imv_id = ?";
        let valores = [id];
        let rows = await this.db.ExecutaComando(sql, valores);

        return this.toMap(rows, false);
    }

    async inserir(entidade) {
        
        let sql = "insert into tb_imovel (imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?)";
        let valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel];

        let imovelId = await this.db.ExecutaComandoLastInserted(sql, valores);
        let result = imovelId > 0 ? true : false
        if(result && entidade.imagens) {
            //faz o insert das imagens
            for(let imagem of entidade.imagens) {

                sql = "insert into tb_imagemimovel (img_blob, imv_id) values (?, ?)";
                valores = [imagem.blob, imovelId];

                result = await this.db.ExecutaComandoNonQuery(sql, valores);

                if(result) {
                    throw new ImovelErro(true, false, "Uma ou mais imagens não foram inseridas!");
                }
            }

        }

        return result;
    }

    async atualizar(entidade) {

        let sql = `update tb_imovel set imv_descricao = ?,
                                        imv_cep = ?,
                                        imv_endereco = ?,
                                        imv_bairro = ?,
                                        imv_cidade = ?,
                                        imv_valor = ?,
                                        imv_disponivel = ?
                                where imv_id  = ?`;
        let valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel, entidade.id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar(id) {

        let sql = "delete from tb_imovel where imv_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows) {
    
        if(typeof rows.length == "number") {
            let lista = [];
            for(let row of rows) {
                let obj = new ImovelEntity();
                obj.id = row["imv_id"];
                obj.descricao = row["imv_descricao"];
                obj.cidade = row["imv_cidade"];
                obj.endereco = row["imv_endereco"];
                obj.bairro = row["imv_bairro"];
                obj.valor = row["imv_valor"];
                obj.cep = row["imv_cep"];
                obj.disponivel = row["imv_disponivel"];
    
                lista.push(obj);
            }

            return lista;
        }
        else {
            let obj = new ImovelEntity();
            obj.id = rows["imv_id"];
            obj.descricao = rows["imv_descricao"];
            obj.cidade = rows["imv_cidade"];
            obj.endereco = rows["imv_endereco"];
            obj.bairro = rows["imv_bairro"];
            obj.valor = rows["imv_valor"];
            obj.cep = rows["imv_cep"];
            obj.disponivel = rows["imv_disponivel"];

            return obj;
        }
    }
}