const {v4: uuidv4} = require(`uuid`);

const agentes = [
{
   "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
  "nome": "Rommel Carneiro",
  "dataDeIncorporacao": "1992/10/04",
  "cargo": "delegado"
}
]

function findAll(){
    return agentes
}

function findAgentById(id){

    return agentes.find(a => a.id === id)

}

function createAgent(agenteData){
    const newAgent = {
        id: uuidv4(),
        ...agenteData
    }

    agentes.push(newAgent)
    return newAgent
   
}

function updateAgents(id,agenteData){
    const index = agentes.findIndex(a => a.id == id)
     if (index === -1) return null;
    agentes[index] = {
        ...agentes[index],
        ...agenteData
    }

    return agentes[index]
}

function deleteAgent(id){
    
    const index = agentes.findIndex(a => a.id ===id)
     if (index === -1) return null;

    const removed = agentes.splice(index,1)
    return removed[0]

    
}

module.exports ={
    findAll,
    findAgentById,
    createAgent,
    updateAgents,
    deleteAgent
}
