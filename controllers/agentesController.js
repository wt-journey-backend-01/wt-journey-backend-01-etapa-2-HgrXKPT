const agenteRepository = require('../repositories/agentesRepository')
const { v4: uuidv4 } = require('uuid');
const { validate: isUuid } = require('uuid');


async function findAll(req, res){
    const agentes = await agenteRepository.findAll()
    res.status(200).json(agentes)
}

async function findById(req,res){
    const {id} = req.params;
    
     if(!id){
              return  res.status(400).json({
                        "mensagem": "Id não fornecido"
                })
        }
        

        if(!isUuid(id)){
              return  res.status(400).json({
                        "mensagem" : "id não é um UUID válido"
                })
        }
        const agente = await agenteRepository.findAgentById(id)
        res.status(200).json(agente)


}
async function addAgente(req,res){
    const {...agente} = req.body
    if(!agente.cargo || !agente.nome || !agente.dataDeIncorporacao){
        throw new Error("Todos os campos devem ser preenchidos")
    }

    const newAgent = {
        id: uuidv4(),
        ...agente
    }

    await agenteRepository.addAgents(newAgent)
    res.status(201).json(newAgent)

}

async function updateAgent(req,res){
    const {id} = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body

    const newAgent = {
        nome: nome,
        dataDeIncorporacao : dataDeIncorporacao,
        cargo: cargo
    }
    await agenteRepository.updateAgents(id,newAgent)
    res.status(200).json(newAgent)
}

async function partialUpdate(req,res){
    const {id} = req.params;
    const{id: _, ...agente} = req.body

    const existingAgent = await agenteRepository.findAgentById(id);

    const newAgent ={
        ...existingAgent,
        ...agente
    }

    await agenteRepository.partialUpdateAgents(id,agente);

    res.status(200).json(newAgent);
}

async function deleteAgent(req,res) {
        const{id} = req.params

        await agenteRepository.deleteAgent(id);
        res.status(204).json({
            "mensagem": "agente Deletado!!!!"
        })
}

module.exports={
    findAll,
    findById,
    addAgente,
    updateAgent,
    partialUpdate,
    deleteAgent
}