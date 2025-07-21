const routes = require('express').Router();
const agenteController = require('../controllers/agentesController');

/**
 * @openapi
 * tags:
 *   name: Agentes
 *   description: Gerenciamento de agentes policiais
 */

/**
 * @openapi
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     description: Retorna uma lista completa de todos os agentes cadastrados
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 */
routes.get('/', agenteController.findAll);

/**
 * @openapi
 * /agentes/{id}:
 *   get:
 *     summary: Obtém um agente específico
 *     description: Retorna os detalhes de um agente pelo seu ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
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
 *         description: Agente não encontrado
 */
routes.get('/:id', agenteController.findById);

/**
 * @openapi
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     description: Cadastra um novo agente no sistema
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgenteInput'
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       400:
 *         description: Dados inválidos
 */
routes.post('/', agenteController.addAgente);

/**
 * @openapi
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza todos os dados de um agente
 *     description: Substitui todos os campos de um agente existente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgenteInput'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 *       400:
 *         description: Dados inválidos
 */
routes.put('/:id', agenteController.updateAgent);

/**
 * @openapi
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente
 *     description: Atualiza apenas alguns campos de um agente existente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgenteUpdate'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 *       400:
 *         description: Dados inválidos
 */
routes.patch('/:id', agenteController.partialUpdate);

/**
 * @openapi
 * /agentes/{id}:
 *   delete:
 *     summary: Remove um agente
 *     description: Exclui permanentemente um agente do sistema
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente removido com sucesso
 *       404:
 *         description: Agente não encontrado
 */
routes.delete('/:id', agenteController.deleteAgent);

module.exports = routes;