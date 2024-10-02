import express from 'express'
import ImovelController from '../controllers/imovelController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import Multer from 'multer';
const router = express.Router();

let upload = Multer(); 
let ctrl = new ImovelController();
let auth = new AuthMiddleware();
router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Retorna uma lista de imóveis cadastrados"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.listar(req, res);
});
router.get("/:id", auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Retorna um imóvel através de um id"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.obter(req, res)
});
router.post("/", upload.array("imagens", 5), (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Cadastra um imóvel"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/imovelModel"
                    }  
                }
            }
        } 
    */
    ctrl.inserir(req, res);
});
router.put("/", auth.validar, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Atualiza um imóvel"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/imovelModel"
                    }  
                }
            }
        } 
    */
    ctrl.atualizar(req, res);
});
router.delete("/:id", auth.validar, (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Faz a deleção de um imóvel através do id"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.deletar(req, res);
});

export default router;