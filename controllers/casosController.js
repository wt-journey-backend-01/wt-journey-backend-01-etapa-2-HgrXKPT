const casosRepository = require("../repositories/casosRepository")
const {v5, NIL} = require('uuid')

function getAllCasos(req, res) {

        const casos = casosRepository.findAll()
        res.json(casos)
}

function getCasoById(req, res){
        const {id} = req.params;
        try{
        const caso = casosRepository.findCaseById(id)
        res.status(200).json(caso)
        }catch(error){
                res.status(400).json({
                        "message": "caso não foi encontrado"
                })
        }
        

        
}


async function createCase(req,res){
        const{id, titulo, descricao, status, agente_id } = req.body;
        const id_uuid = v5(id.toString(), NIL);
        const agente_uuid = v5(agente_id.toString(), NIL).toString();

        const newCase = {
                id: id_uuid,
                titulo: titulo,
                descricao: descricao,
                status: status,
                agente_id: agente_uuid
        }

       await casosRepository.addCases(newCase);

        res.status(201).json(newCase);
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCase
}