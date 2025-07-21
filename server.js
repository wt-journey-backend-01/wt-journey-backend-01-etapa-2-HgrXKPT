const express = require('express')
const app = express();

const errorHandler = require(`./utils/errorHandler`);
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');


const casosRoute = require('./routes/casosRoutes')
const agentesRoute = require('./routes/agentesRoutes')

require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/casos', casosRoute);
app.use('/agentes', agentesRoute);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/docs`);
});