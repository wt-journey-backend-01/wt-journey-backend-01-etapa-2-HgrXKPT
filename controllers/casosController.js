const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { validate: isUuid } = require("uuid");

function getAllCasos(req, res) {
  const { status, agente_id, search } = req.query;
  let casos = casosRepository.findAll();

  if (status) {
    casos = casos.filter((c) => c.status === status);
  }

  if (agente_id) {
    casos = casos.filter((c) => c.agente_id === agente_id);
  }

  if (search) {
    casos = casos.filter(
      (c) =>
        c.titulo.toLowerCase().includes(search.toLowerCase()) ||
        c.descricao.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(casos);
}

function getCasoById(req, res) {
  const { agente_id } = req.query;

  const { caso_id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const caso = casosRepository.findCaseById(caso_id);

  if (agente_id) {
    caso = caso.filter((c) => c.agente_id === agente_id);
  }

    if (!caso) {
        res.status(404).json({
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            id: "O caso não foi encontrado",
        },
        });
    }

  res.status(200).json(caso);
}

function getAgenteAssocitateToCase(req, res) {
  const { caso_id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const caso = casosRepository.findCaseById(caso_id);

  if (!caso) {
    res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O caso não foi encontrado",
      },
    });
  }

  console.log(caso.agente_id);

  const agente = agentesRepository.findAgentById(caso.agente_id) 

    res.status(200).send(agente);
  }


function createCase(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({
      status: 400,
      message: `Parâmetros inválidos`,
      errors: {
        titulo: !titulo ? "Campo obrigatório não informado" : undefined,
        descricao: !descricao ? "Campo obrigatório não informado" : undefined,
        status: !status ? "Campo obrigatório não informado" : undefined,
        agente_id: !agente_id ? "Campo obrigatório não informado" : undefined,
      },
    });
  }

  if (status !== `aberto` && status !== `solucionado`) {
    return res.status(400).json({
      status: 400,
      message: `Parâmetros inválidos`,
      errors: {
        status: "O campo `status` pode ser somente `aberto` ou `solucionado`",
      },
    });
  }

  const existingAgent = agentesRepository.findAgentById(agente_id);
  if (!existingAgent) {
    res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O id enviado é invalido' ",
      },
    });
  }

  const newCase = {
    titulo,
    descricao,
    status,
    agente_id,
  };
  casosRepository.createCases(newCase);

  res.status(201).json(newCase);
}

function updateCase(req, res) {
  const { caso_id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const newCase = req.body;

  const updated = casosRepository.updateCase(caso_id, newCase);

  if (!updated) {
    res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O id enviado não corresponde a nenhum caso' ",
      },
    });
  }

  res.status(200).json(updated);
}

function parcialUpdateCase(req, res) {
  const { caso_id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const fields = req.body;

  const updated = casosRepository.updateCase(caso_id, fields);

  if (!updated) {
    res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O id enviado não corresponde a nenhum caso' ",
      },
    });
  }

  res.status(200).json(updated);
}

function deleteCase(req, res) {
  const { caso_id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const removed = casosRepository.deleteCase(caso_id);
  if (!removed) {
    res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O id enviado é invalido' ",
      },
    });
  }

  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCase,
  updateCase,
  parcialUpdateCase,
  deleteCase,
  getAgenteAssocitateToCase,
};
