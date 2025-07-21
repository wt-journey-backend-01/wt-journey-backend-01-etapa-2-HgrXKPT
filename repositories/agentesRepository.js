const {v4: uuidv4} = require(`uuid`);

const agentes = [
{
    "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
    "nome": "Rommel Carneiro",
    "dataDeIncorporacao": "1992-10-04",
    "cargo": "delegado(a)"
  },
  {
    "id": "d4e3fc4a-9c5b-4cbe-9cc6-ded6e75ac711",
    "nome": "Cláudia Tavares",
    "dataDeIncorporacao": "2001-06-12",
    "cargo": "investigador(a)"
  },
  {
    "id": "f7b9090f-25aa-47aa-a4f6-58f53fc09c3a",
    "nome": "Henrique Batista",
    "dataDeIncorporacao": "1998-03-22",
    "cargo": "agente especial"
  },
  {
    "id": "87d944c4-3bc5-4f66-b4f0-d187f56a6c20",
    "nome": "Larissa Cunha",
    "dataDeIncorporacao": "2010-11-08",
    "cargo": "delegado(a)"
  },
  {
    "id": "2e0ac303-7ee0-470e-98fb-c2901b839be7",
    "nome": "Douglas Farias",
    "dataDeIncorporacao": "2007-01-16",
    "cargo": "perito criminal"
  }
];

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
