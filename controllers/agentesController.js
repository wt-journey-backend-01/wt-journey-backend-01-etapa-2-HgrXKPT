const agentesRepository = require("../repositories/agentesRepository");
const { parseISO, isValid, isFuture } = require("date-fns");
const { validate: isUuid } = require("uuid");
const Joi = require('joi');



function findAll(req, res) {
  const { cargo, sort } = req.query;
  let agentes = agentesRepository.findAll();

  if (cargo) {
    agentes = agentes.filter((a) =>
      a.cargo.toLowerCase().includes(cargo.toLowerCase())
    );
  }

  if (sort === "dataDeIncorporacao") {
    agentes.sort(
      (a, b) =>
        new Date(a.dataDeIncorporacao).getTime() -
        new Date(b.dataDeIncorporacao).getTime()
    );
  } else if (sort === "-dataDeIncorporacao") {
    agentes.sort(
      (a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
    );
  }

  res.status(200).json(agentes);
}

function findById(req, res) {
  const { id } = req.params;

  const agente = agentesRepository.findAgentById(id);
  if (!agente) {
    return res.status(404).json({
      status: 404,
      message: "Agente não encontrado",
      errors: {
        id: "Nenhum agente encontrado com o ID fornecido",
      },
    });
  };

  res.status(200).json(agente);
}
function addAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({
      status: 400,
      message: `Parâmetros inválidos`,
      errors: {
        nome: !nome ? "Campo obrigatório não informado" : undefined,
        dataDeIncorporacao: !dataDeIncorporacao
          ? "Campo obrigatório não informado"
          : undefined,
        cargo: !cargo ? "Campo obrigatório não informado" : undefined,
      },
    });
  }

  const data = parseISO(dataDeIncorporacao);
  if (!isValid(data)) {
    return res.status(400).json({
      status: 400,
      message: "Data inválida",
      errors: {
        dataDeIncorporacao: "Formato de data inválido, use YYYY-MM-DD",
      },
    });
  }

  if (isFuture(data)) {
    return res.status(400).json({
      status: 400,
      message: "Data inválida",
      errors: {
        dataDeIncorporacao: "Data de incorporação não pode ser no futuro",
      },
    });
  }

  const newAgent = {
    nome,
    dataDeIncorporacao,
    cargo,
  };
  const agent = agentesRepository.createAgent(newAgent);
  res.status(201).json(agent);
}

function updateAgent(req, res) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (req.body.id && req.body.id !== id) {
    return res.status(400).json({
      status: 400,
      message: "Não é permitido alterar o campo 'id'.",
    });
  }

  if (!nome && !dataDeIncorporacao && !cargo) {
    return res.status(400).json({
      status: 400,
      message: "Dados incorretos",
      errors: { id: "Um ou mais dados foram enviados incorretamente" },
    });
  }

  if (!nome || nome.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Nome incorreto",
      errors: { id: "Nome invalido ou vazio" },
    });
  }

  if (!dataDeIncorporacao || dataDeIncorporacao.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "DataDeIncorporacao incorreto",
      errors: { id: "dataDeIncorporacao invalido ou vazio" },
    });
  }
  if (!cargo || cargo.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Cargo incorreto",
      errors: { id: "Cargo invalido ou vazio" },
    });
  }

  const newAgent = {
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const updated = agentesRepository.updateAgents(id, newAgent);

  if (!updated) {
    return res.status(404).json({
      status: 404,
      message: "Agente não encontrado",
      errors: { id: "O id do agente fornecido é invalido" },
    });
  };

  res.status(200).json(updated);
}

function partialUpdate(req, res) {

  const partialSchema = Joi.object({
    nome: Joi.string().trim().min(1).optional(),
    dataDeIncorporacao: Joi.string().trim().min(1).optional(),
    cargo: Joi.string().trim().min(1).optional()
  }).min(1);

  const { id } = req.params;
  const { error, value } = partialSchema.validate(req.body);


  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

   if (error) {
    return res.status(400).json({
      status: 400,
      message: "Payload incorreto",
      errors: {
        id: "O payload está incorreto",
      },
    });
  }

  if (req.body.id && req.body.id !== id) {
    return res.status(400).json({
      status: 400,
      message: "Não é permitido alterar o campo 'id'.",
    });
  }

  const agente = agentesRepository.findAgentById(id);
  if (!agente) {
    return res.status(404).json({
      status: 404,
      message: "Agente não encontrado",
      errors: {
        id: "O agente não foi encontrado"
      }
    });
  };

  const fields = {};
  if (value.nome !== undefined) fields.nome = value.nome;
  if (value.dataDeIncorporacao !== undefined) fields.dataDeIncorporacao = value.dataDeIncorporacao;
  if (value.cargo !== undefined) fields.cargo = value.cargo;

  const updated = agentesRepository.updateAgents(id, fields);

  res.status(200).json(updated);
}

function deleteAgent(req, res) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const removed = agentesRepository.deleteAgent(id);

  if (!removed) {
    return res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O agente não foi encontrado",
      },
    });
  };

  res.status(204).send();
}

module.exports = {
  findAll,
  findById,
  addAgente,
  updateAgent,
  partialUpdate,
  deleteAgent,
};
