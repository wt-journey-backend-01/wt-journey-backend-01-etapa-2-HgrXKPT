const routes = require('express').Router();
const casosController = require('../controllers/casosController')


routes.get('/casos', casosController.getAllCasos);


routes.get('/casos/:id', casosController.getCasoById)

routes.post('/casos', casosController.createCase)

routes.put('/casos/:id', casosController.updateCase)

routes.patch('/casos/:id', casosController.parcialUpdateCase)


module.exports = routes;