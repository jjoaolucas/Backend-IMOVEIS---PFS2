import express from 'express'
import routerUsuarios from './routes/usuarioRoute.js'
import routerAutenticacao from './routes/autenticacaoRoute.js'
import routerImovel from './routes/imovelRoute.js'
import routerAluguel from './routes/aluguelRoute.js';
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))
app.use("/usuarios", routerUsuarios);
app.use("/auth", routerAutenticacao);
app.use("/imovel", routerImovel);
app.use("/aluguel", routerAluguel);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});