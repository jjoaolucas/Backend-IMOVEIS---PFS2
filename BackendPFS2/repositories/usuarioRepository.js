import PerfilEntity from "../entities/perfilEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import BaseRepository from "./baseRepository.js";


export default class UsuarioRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async validarAcesso(email, senha) {

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let valores = [email, senha];

        let row = await this.db.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async listar() {
        let sql = "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id";
        let lista = [];
        let rows = await this.db.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async deletar(id) {
        let sql = "delete from tb_usuario where usu_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar(entidade) {
        
        let sql = "insert into tb_usuario (usu_nome, usu_email, usu_ativo, usu_senha, per_id) values (?, ?, ?, ?, ?)";

        let valores = [entidade.nome, entidade.email, entidade.ativo, entidade.senha, entidade.perfil.id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];

        let row = await this.db.ExecutaComando(sql, valores);

        return this.toMap(row[0]);
    }

    async alterar(entidade) {
        let sql = "update tb_usuario set usu_nome = ?, usu_email = ?, usu_ativo = ?, usu_senha = ?, per_id = ? where usu_id = ?";
        let valores = [entidade.nome, entidade.email, entidade.ativo, entidade.senha, entidade.perfil.id, entidade.id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alteracaoParcial(entidade) {

        let sql = `update tb_usuario set usu_nome = coalesce(?, usu_nome),
                                         usu_email = coalesce(?, usu_email),
                                         usu_ativo = coalesce(?, usu_ativo),
                                         usu_senha = coalesce(?, usu_senha),
                                         per_id = coalesce(?, per_id)  
                    where usu_id = ?`;
        
        let valores = [entidade.nome, entidade.email, entidade.ativo, entidade.senha, entidade.perfil ? entidade.perfil.id : null, entidade.id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let usuario = new UsuarioEntity();
                usuario.id = row["usu_id"];
                usuario.nome = row["usu_nome"];
                usuario.email = row["usu_email"];
                usuario.ativo = row["usu_ativo"];
                usuario.senha = row["usu_senha"];
                usuario.perfil = new PerfilEntity();
                usuario.perfil.id = row["per_id"];
                usuario.perfil.descricao = row["per_descricao"];
    
                lista.push(usuario);
            }

            return lista;
        }
        else{
            let usuario = new UsuarioEntity();
            usuario.id = rows["usu_id"];
            usuario.nome = rows["usu_nome"];
            usuario.email = rows["usu_email"];
            usuario.ativo = rows["usu_ativo"];
            usuario.senha = rows["usu_senha"];
            usuario.perfil = new PerfilEntity();
            usuario.perfil.id = rows["per_id"];
            usuario.perfil.descricao = rows["per_descricao"];

            return usuario;
        }
    }
}