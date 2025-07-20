const routes = require('express').Router();
const agenteController = require('../controllers/agentesController');

routes.get('/', agenteController.findAll);


routes.get('/:id', agenteController.findById)

routes.post('/', agenteController.addAgente)

routes.put('/:id', agenteController.updateAgent)

routes.patch('/:id', agenteController.partialUpdate)

routes.delete('/:id', agenteController.deleteAgent)


module.exports = routes;