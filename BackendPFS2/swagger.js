import swaggerAutogen from "swagger-autogen";
import UsuarioEntity from "./entities/usuarioEntity.js";
import PerfilEntity from "./entities/perfilEntity.js";
import ImovelEntity from "./entities/imovelEntity.js";
const doc = {
    info: {
        title: "PFS2 - API",
        description: "API criada utilizando o padrão REST na disciplina de Programação Fullstack 2"
    },
    host: 'localhost:5000',
    components: {
        schemas: {
            usuarioModel: new UsuarioEntity(0, "fulano@email.com", "Fulano", 1, "12345", new PerfilEntity(1, "Administrador")).toJSON(),
            perfilModel: new PerfilEntity(1, "Administrador").toJSON(),
            //imovelModel: new ImovelEntity(999, "Casa na Praia", "19026-000", "Presidente Prudente", "Bairro Teste", 999, "S", "Rua dos Bobos, 0").toJSON()
        },
        '@schemas': {
            imovelModel: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        required: true,
                    },
                    descricao: {
                        type: "string",
                        required: true,
                    },
                    endereco: {
                        type: "string",
                        required: true,
                    },
                    cep: {
                        type: "string",
                        required: true,
                    },
                    bairro: {
                        type: "string",
                        required: true,
                    },
                    cidade: {
                        type: "string",
                        required: true,
                    },
                    valor: {
                        type: "number",
                        required: true,
                    },
                    disponivel: {
                        type: "string",
                        required: true,
                    },
                    imagens: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "binary"
                        }
                    }
                }
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})