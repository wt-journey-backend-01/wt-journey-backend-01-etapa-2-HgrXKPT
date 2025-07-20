const casosRepository = require("../repositories/casosRepository")
const agentesRepository = require('../repositories/agentesRepository')

function getAllCasos(req, res) {

        const casos = casosRepository.findAll()
        res.status(200).json(casos);
}

function getCasoById(req, res){
        const {id} = req.params;
        const caso = casosRepository.findCaseById(id)
        if(!caso){
                res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado é invalido' "
        }     
        })
        }

        res.status(200).json(caso);
        

        
}


function createCase(req,res){
        const{titulo, descricao, status, agente_id} = req.body;

        

        if(!titulo || !descricao || !status || !agente_id){
                 return res.status(400).json({
                status: 400,
                message: `Parâmetros inválidos`,
                errors: {
                        titulo: !titulo ? mensagemErro : undefined,
                        descricao: !descricao ? mensagemErro : undefined,
                        status: !status ? mensagemErro : undefined,
                        agente_id: !agente_id ? mensagemErro : undefined,
            },
        });
        }

        if (status !== `aberto` && status !== `solucionado`){
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors:{
                status: "O campo `status` pode ser somente `aberto` ou `solucionado`",
            },
        });
    }

    const existingAgent = agentesRepository.findAgentById(agente_id)
    if(!existingAgent){
         res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado é invalido' "
        }     
        })
    }

    const newCase = {
        titulo, 
        descricao, 
        status, 
        agente_id
    }
    casosRepository.createCases(newCase)

    res.status(201).json(newCase)
        
}

function updateCase(req, res){
        const {id} = req.params;
    const newCase = req.body;

    const updated = casosRepository.updateCase(id,newCase)

    if(!updated){
        res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado não corresponde a nenhum caso' "
        }     
        })
    }

     res.status(200).json(updated)

        

}

function parcialUpdateCase(req,res){
        
    const {id} = req.params;
    const fields = req.body;

    const updated = casosRepository.updateCase(id,fields)

    if(!updated){
        res.status(404).json(
                    {
        status: 404,
        message: "Parâmetros inválidos",
        errors: {
            "id" : "O id enviado não corresponde a nenhum caso' "
        }     
        })
    }

     res.status(200).json(updated)

}

function deleteCase(req,res) {
        const {id} = req.params;
        const removed = casosRepository.deleteCase(id);
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



        res.status(204).send();

        
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCase,
   updateCase,
   parcialUpdateCase,
   deleteCase
}