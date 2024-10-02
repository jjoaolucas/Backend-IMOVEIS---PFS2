import express from "express";
import AluguelController from "../controllers/aluguelController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

let ctrl = new AluguelController();
let auth = new AuthMiddleware();

router.get("/locar/:idImovel", auth.validar, (req, res) => {
    // #swagger.tags = ['Aluguel']
    // #swagger.summary = "Endpoint para realizar o processo de locação de imóveis"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.locar(req, res)
});

router.get("/lista/:idUsuario", auth.validar, (req, res) => {
    // #swagger.tags = ['Aluguel']
    // #swagger.summary = "Endpoint para listar o aluguel de um usuário"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.listarPorUsuario(req, res);
})

export default router;