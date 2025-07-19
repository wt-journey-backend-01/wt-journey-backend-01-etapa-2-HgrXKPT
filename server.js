const express = require('express')
const app = express();

const casosRoute = require('./routes/casosRoutes')

require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());

app.use('/casos', casosRoute);


app.listen(port, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${port}`);
});