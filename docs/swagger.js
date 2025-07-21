const swaggerJSDoc = require(`swagger-jsdoc`);

const options = {
    definition: {
        openapi: `3.0.0`,
        info: {
            title: `API do Departamento de Polícia`,
            version: `1.0.0`,
            description: `API para gerenciar agentes e casos da polícia`,
        },
    },
    apis: [`./routes/*.js`],
};


const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec;