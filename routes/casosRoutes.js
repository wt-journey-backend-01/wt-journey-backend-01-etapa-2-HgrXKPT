const routes = require('express').Router();
const casosController = require('../controllers/casosController');

/**
 * @openapi
 * tags:
 *   name: Casos
 *   description: Gestão de casos policiais
 */

/**
 * @openapi
 * /casos:
 *   get:
 *     summary: Lista todos os casos
 *     description: Retorna todos os casos registrados no sistema
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/', casosController.getAllCasos);

/**
 * @openapi
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Obtém o agente associado a um caso
 *     description: Retorna o agente responsável por um caso específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Caso não encontrado ou sem agente associado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/:caso_id/agente', casosController.getAgenteAssocitateToCase);

/**
 * @openapi
 * /casos/{caso_id}:
 *   get:
 *     summary: Obtém um caso específico
 *     description: Retorna os detalhes completos de um caso pelo seu ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/:caso_id', casosController.getCasoById);

/**
 * @openapi
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     description: Registra um novo caso no sistema
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
routes.post('/', casosController.createCase);

/**
 * @openapi
 * /casos/{caso_id}:
 *   put:
 *     summary: Atualiza todos os dados de um caso
 *     description: Substitui completamente os dados de um caso existente
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.put('/:caso_id', casosController.updateCase);

/**
 * @openapi
 * /casos/{caso_id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     description: Atualiza apenas campos específicos de um caso existente
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoUpdate'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.patch('/:caso_id', casosController.parcialUpdateCase);

/**
 * @openapi
 * /casos/{caso_id}:
 *   delete:
 *     summary: Remove um caso
 *     description: Exclui permanentemente um caso do sistema
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso removido com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete('/:caso_id', casosController.deleteCase);

module.exports = routes;