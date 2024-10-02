import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';

const SEGREDO = "1BA1B2@@@@@&&&;;;;;;&&&B3C4D5";

export default class AuthMiddleware {

    gerarToken(id, nome, email, perfilId) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
            perfilId: perfilId
        }, SEGREDO, { expiresIn: 360 } );
    }

    async validar(req, res, next) {
        //procurar chave no cabeçalho;
        let {token} = req.cookies;
        if(token){
            try {
                let objUsuario = jwt.verify(token, SEGREDO);
                let repo = new UsuarioRepository();
                let usuario = await repo.obter(objUsuario.id);
                if(usuario) {
                    let auth = new AuthMiddleware();
                    let tokenNovo = auth.gerarToken(objUsuario.id, objUsuario.nome, objUsuario.email, objUsuario.perfilId)
                    res.cookie("token", tokenNovo, {
                        httpOnly:true
                    })
                    req.usuarioLogado = usuario;
                    next();
                }
                else{
                    res.status(401).json({msg: "Não autorizado!"});
                }
            }
            catch(ex) {
                //não foi possível validar o token
                res.status(401).json({msg: "Não autorizado!"});
            }
        }
        else{
            res.status(401).json({msg: "Não autorizado!"});
        }
    }

}