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
    
    const caso =  casos.find(c => c.id === id);
    if(!caso){
        throw new Error("Caso não existente")
    }

    return caso;
   

}

async function addCases(caseData){

   
    const newCase = {
        id: caseData.id,
        titulo: caseData.titulo,
        descricao: caseData.descricao,
        status: caseData.status,
        agente_id: caseData.agente_id
    };

    await casos.push(newCase);

    return newCase;

}

 function updateCase(id, caseData){

    if(!caseData){
        throw new Error("CaseData invalido")
    }

    const index = casos.findIndex(c => c.id === id)


    casos[index] = {
        ...casos[index],
        titulo: caseData.titulo,
        descricao: caseData.descricao,
        status: caseData.status,
    };

    
 
    return casos[index];
    
    
}

function parcialUpdateCase(id,caseData){

    

    const index = casos.findIndex(c =>c.id === id)
    

    const updateCase = {
        ...casos[index],
        ...caseData
    }

    casos[index] = updateCase;

    return casos[index]


}

function deleteCase(id){

    const index = casos.findIndex(c => c.id === id)

    if(!index){
        throw new Error("Caso não encontrado")
    }
    casos.splice(index,1)

}



module.exports = {
    findAll,
    findCaseById,
    addCases,
    updateCase,
    parcialUpdateCase,
    deleteCase
}
