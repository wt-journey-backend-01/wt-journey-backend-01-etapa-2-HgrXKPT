const agentesRepository = require('../repositories/agentesRepository')

function findAll(req, res){
    const agentes = agentesRepository.findAll()
    res.status(200).json(agentes)
}

function findById(req,res){
    const {id} = req.params;
    const agente = agentesRepository.findAgentById(id);
    if(!agente){
        res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado é invalido' "
        }     
        })
    }

    res.status(200).json(agente)
    
        
}
function addAgente(req,res){
     const {nome, dataDeIncorporacao, cargo} = req.body;

     if (!nome || !dataDeIncorporacao || !cargo){
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                nome: !nome ? mensagemErro : undefined,
                dataDeIncorporacao: !dataDeIncorporacao ? mensagemErro : undefined,
                cargo: !cargo ? mensagemErro : undefined,
            },
        });
    }

    const newAgent={
        nome,
        dataDeIncorporacao,
        cargo
    }
    const agent = agentesRepository.createAgent(newAgent)
    res.status(201).json(agent)

}

 function updateAgent(req,res){

     const {id} = req.params;
    const newAgent = req.body;

    const updated = agentesRepository.updateAgents(id, newAgent)

    if (!updated){
        return res.status(404).json({message:`Agente não encontrado`});
    }

    res.status(200).json(updated);
   
}

function partialUpdate(req,res){

     const {id} = req.params;
    const fields = req.body;

    const updated = agentesRepository.updateAgents(id, fields)

    if (!updated){
        return res.status(404).json({message:`Agente não encontrado`});
    }

    res.status(200).json(updated);

 
}

function deleteAgent(req,res) {
    const {id} = req.params;
    const removed = agentesRepository.deleteAgent(id)

    if(!removed){
        res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado é invalido' "
        }     
        })
    }

    res.status(204).send()
        
}

module.exports={
    findAll,
    findById,
    addAgente,
    updateAgent,
    partialUpdate,
    deleteAgent
}