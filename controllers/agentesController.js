const agentesRepository = require("../repositories/agentesRepository");
const { parseISO, isValid, isFuture } = require("date-fns");
const { validate: isUuid } = require("uuid");

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
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const agente = agentesRepository.findAgentById(id);
  if (!agente) {
    return res.status(404).json({
      status: 404,
      message: "Parâmetros inválidos",
      errors: {
        id: "O agente não foi encontrado",
      },
    });
  }

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
  if (!nome && !dataDeIncorporacao && !cargo) {
    return res.status(400).json({
      status: 400,
      message: "Dados incorretos",
      errors: { id: "Um ou mais dados foram enviados incorretamente" },
    });
  }
  if (nome.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Nome incorreto",
      errors: { id: "Nome invalido ou vazio" },
    });
  }
  if (dataDeIncorporacao.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "DataDeIncorporacao incorreto",
      errors: { id: "dataDeIncorporacao invalido ou vazio" },
    });
  }
  if (cargo.trim() === "") {
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
  }

  res.status(200).json(updated);
}

function partialUpdate(req, res) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({
      status: 400,
      message: "ID inválido",
      errors: { id: "O ID deve ser um UUID válido" },
    });
  }

  const { nome, dataDeIncorporacao, cargo } = req.body;

  const agente = agentesRepository.findAgentById(id);

  const fields = {
    nome: !nome || nome.trim() === "" ? agente.nome : nome.trim(),
    dataDeIncorporacao:
      !dataDeIncorporacao || dataDeIncorporacao.trim() === ""
        ? agente.dataDeIncorporacao
        : dataDeIncorporacao.trim(),
    cargo:
      cargo === undefined || cargo.trim() === "" ? agente.cargo : cargo.trim(),
  };

  const updated = agentesRepository.updateAgents(id, fields);

  if (!updated) {
    return res.status(404).json({
      status: 404,
      message: "Agente não encontrado",
      errors: { id: "O id do agente fornecido é invalido" },
    });
  }

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
  }

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
