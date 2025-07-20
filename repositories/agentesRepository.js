const { deleteCase } = require("./casosRepository")

const agentes = [
{
  "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
  "nome": "Rommel Carneiro",
  "dataDeIncorporacao": "1992/10/04",
  "cargo": "delegado"

}
]

function findAll(){
    return [...agentes]
}

function findAgentById(id){
    
    const agente = agentes.find(a => a.id === id)
    if(!agente){
        throw new Error("Agente não encontrado")
    }

    return agente
}

function addAgents(agenteData){

    const newAgent = {
        ...agenteData
    }
    agentes.push(newAgent)
    return agenteData

}

function partialUpdateAgents(id,agenteData){
    
    const index = agentes.findIndex(a => a.id === id)

    const updateAgent = {
        ...agentes[index],
        ...agenteData
    }

    agentes[index] = updateAgent
    return agentes[index]
}

function updateAgents(id,agenteData){
    const index = agentes.findIndex(a => a.id === id)
    const newAgent = agenteData;

    agentes[index] = {
        ...agentes[index],
        ...newAgent
    }

    return agentes[index]
}

function deleteAgent(id){

    const index = agentes.findIndex(a => a.id === id)

    if(index < 0){
        throw new Error("Caso não encontrado")
    }
    agentes.splice(index,1)

    
}

module.exports ={
    findAll,
    findAgentById,
    addAgents,
    updateAgents,
    partialUpdateAgents,
    deleteAgent
}
