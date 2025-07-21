const {v4: uuidv4} = require(`uuid`);

const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
  },
  {
    id: "2a3fa067-91d9-4971-a7ae-3e0d4971e093",
    titulo: "roubo a residência",
    descricao: "No dia 12/05/2018, uma residência no bairro Eldorado foi invadida por dois suspeitos armados. Vários bens foram levados.",
    status: "aberto",
    agente_id: "d4e3fc4a-9c5b-4cbe-9cc6-ded6e75ac711"
  },
  {
    id: "5c11e2f9-f8d9-40f5-83aa-0a50f622a7e1",
    titulo: "tráfico de drogas",
    descricao: "Após denúncia anônima, um ponto de venda de entorpecentes foi localizado e investigado no bairro Industrial.",
    status: "solucionado",
    agente_id: "f7b9090f-25aa-47aa-a4f6-58f53fc09c3a"
  },
  {
    id: "e25ed2d3-3501-4f4c-b1db-00de9a4c9c55",
    titulo: "sequestro",
    descricao: "Uma jovem foi dada como desaparecida após sair da escola. Suspeita de sequestro confirmada após 48h sem contato.",
    status: "aberto",
    agente_id: "87d944c4-3bc5-4f66-b4f0-d187f56a6c20"
  },
  {
    id: "cb65b8bc-8a61-4d5e-92d2-bbdcb7cfd04f",
    titulo: "fraude bancária",
    descricao: "Indivíduos usaram documentos falsos para abrir contas e realizar transferências ilegais no valor de R$ 200 mil.",
    status: "aberto",
    agente_id: "2e0ac303-7ee0-470e-98fb-c2901b839be7"
  }
]

 function findAll() {
    return  [...casos];
}

 function findCaseById(id){
    
    return casos.find(c => c.id === id);
   

}

function createCase(caseData){

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
    createCase,
    updateCase,
    deleteCase
}
