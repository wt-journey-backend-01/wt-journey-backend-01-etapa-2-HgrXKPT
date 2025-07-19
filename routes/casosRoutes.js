const routes = require('express').Router();
const casosController = require('../controllers/casosController')


routes.get('/', casosController.getAllCasos);


routes.get('/:id', casosController.getCasoById)

routes.post('/', casosController.createCase)

routes.put('/:id', casosController.updateCase)

routes.patch('/:id', casosController.parcialUpdateCase)

routes.delete('/:id', casosController.deleteCase)


module.exports = routes;