const routes = require('express').Router();
const casosController = require('../controllers/casosController')


routes.get('/', casosController.getAllCasos);

routes.get('/:caso_id/agente', casosController.getAgenteAssocitateToCase)

routes.get('/:caso_id', casosController.getCasoById)



routes.post('/', casosController.createCase)

routes.put('/:caso_id', casosController.updateCase)

routes.patch('/:caso_id', casosController.parcialUpdateCase)

routes.delete('/:caso_id', casosController.deleteCase)


module.exports = routes;