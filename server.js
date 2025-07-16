const express = require('express')
const app = express();
const PORT = 3000;
const casosRoute = require('../wt-journey-backend-01-etapa-2-HgrXKPT/routes/casosRoutes')

app.use(express.json());

app.use(casosRoute);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});