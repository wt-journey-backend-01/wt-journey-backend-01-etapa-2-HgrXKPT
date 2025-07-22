const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { validate: isUuid } = require("uuid");
const Joi = require("joi");

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

  if (!isUuid(caso_id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { caso_id: "O ID deve ser um UUID válido" },
    });
  }
  
  let caso = casosRepository.findCaseById(caso_id);

  if (!caso) {
    return res.status(404).json({
      status: 404,
      message: "Caso inexistente",
      errors: {
        caso_id: "O caso não foi encontrado" },
    });
  };



  if (agente_id) {
    caso = caso.id.filter((c) => c.agente_id === agente_id);
  }

  res.status(200).json(caso);
}

function getAgenteAssocitateToCase(req, res) {
  const { caso_id } = req.params;

  if (!isUuid(caso_id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { caso_id: "O ID deve ser um UUID válido" },
    });
  }

  const caso = casosRepository.findCaseById(caso_id);

  if (!caso) {
    return res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        caso_id: "O caso não foi encontrado",},
    });
  };

  const agente = agentesRepository.findAgentById(caso.agente_id);

  res.status(200).json(agente);
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
    return res.status(404).json({
      status: 404,
      message: "Agente inexistente",
      errors: {
        id: "Agente não encontrado",
      },
    });
  };

  const newCase = {
    titulo,
    descricao,
    status,
    agente_id,
  };

  const createdCase = casosRepository.createCase(newCase);

  res.status(201).json(createdCase);
}

function updateCase(req, res) {
  const updateSchema = Joi.object({
    titulo: Joi.string().trim().min(1).required(),
    descricao: Joi.string().trim().min(1).required(),
    status: Joi.string().valid("aberto", "solucionado").required(),
    agente_id: Joi.string().uuid().required(),
  }).strict();
  const { caso_id } = req.params;

  const { error, value } = updateSchema.validate(req.body, {
    allowUnknown: false,
  });

  if (error) {
    const errorDetails = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message.replace(/"/g, "'");
      return acc;
    }, {});

    return res.status(400).json({
      status: 400,
      message: "Dados inválidos",
      errors: errorDetails
    });
  }

  if (!isUuid(caso_id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { caso_id: "O ID deve ser um UUID válido" }
    });
  }

  if (value.id && value.id !== caso_id) {
    return res.status(400).json({
      status: 400,
      message: "Não é permitido alterar o campo 'id'.",
    });
  }

  const existingCase = casosRepository.findCaseById(caso_id);
  if (!existingCase) {
    return res.status(404).json({
      status: 404,
      message: "Caso não encontrado",
      errors: {
        caso_id: "Nenhum caso encontrado com o ID fornecido",
      },
    });
  };

  if (value.agente_id) {
    const agentExists = agentesRepository.findAgentById(value.agente_id);

    if (!agentExists) {
      return res.status(404).json({
        status: 404,
        message: "Agente não encontrado",
      });
    }
  };

  const updated = casosRepository.updateCase(caso_id, value);
  res.status(200).json(updated);
}

function parcialUpdateCase(req, res) {
  const { caso_id } = req.params;

  const fields = req.body;

  if (!isUuid(caso_id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { caso_id: "O ID deve ser um UUID válido" },
    });
  }

  const existingCase = casosRepository.findCaseById(caso_id);
  if (!existingCase) {
    return res.status(404).json({
      status: 404,
      message: "Caso não encontrado",
      errors: {
        caso_id: "Nenhum caso encontrado com o ID fornecido",
      },
    });
  };


  if (
    fields.status &&
    fields.status !== `aberto` &&
    fields.status !== `solucionado`
  ) {
    return res.status(400).json({
      message: "Status inválido",
      errors: {
        status: "Use apenas 'aberto' ou 'solucionado'",
      },
    });
  }

  if (fields.agente_id) {
    const agenteExiste = agentesRepository
      .findAll()
      .some((agente) => agente.id === fields.agente_id);

    if (!agenteExiste) {
      return res.status(404).json({
        status: 404,
        message: `Agente responsável não encontrado`,
      });
    }
  };

 

  const updated = casosRepository.updateCase(caso_id, fields);

  res.status(200).json(updated);
}

function deleteCase(req, res) {
  const { caso_id } = req.params;
  if (!isUuid(caso_id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { caso_id: "O ID deve ser um UUID válido" },
    });
  }

  const removed = casosRepository.deleteCase(caso_id);
  if (!removed) {
    return res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        caso_id: "O caso não foi encontrado' ",
      },
    });
  };

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
