const {v4: uuidv4} = require(`uuid`);

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    
    }
    
]

 function findAll() {
    return  [...casos];
}

 function findCaseById(id){
    
    return casos.find(c => c.id === id);
   

}

function createCases(caseData){

     const newCase= {
        id: uuidv4(),
        ...caseData
     }
    casos.push(newCase);

    return newCase;

}

 function updateCase(id, caseData){

    const index = casos.findIndex(c => c.id === id)
    if(index === -1)return null

    casos[index] = {
        ...casos[index],
        ...caseData
    };

    return casos[index];
    
    
}
function deleteCase(id){

    const index = casos.findIndex(c => c.id === id)

    if(index === -1)return null

    const removed = casos.splice(index,1)
    return removed[0]

}



module.exports = {
    findAll,
    findCaseById,
    createCases,
    updateCase,
    deleteCase
}
