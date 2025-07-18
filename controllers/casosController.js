const casosRepository = require("../repositories/casosRepository")
const {v5, NIL} = require('uuid')

function getAllCasos(req, res) {

        const casos = casosRepository.findAll()
        res.status(200).json(casos);
}

function getCasoById(req, res){
        const {id} = req.params;
        try{

        const id_uuid = v5(id.toString(), NIL);

        const caso = casosRepository.findCaseById(id_uuid)
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
        //verificar se id existe
        

        const agente_uuid = v5(agente_id.toString(), NIL);

        //verificar se agente existe

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

async function updateCase(req, res){

        const {id} = req.params;

        const{ titulo, descricao, status } = req.body;

         const id_uuid = v5(id.toString(), NIL);
        //verificar se id existe
        



        const newCase = {
                titulo: titulo,
                descricao: descricao,
                status: status,
        }

        await casosRepository.updateCase(id_uuid,newCase)

        res.status(200).json(newCase)

}

async function parcialUpdateCase(req,res){
        const{id} = req.params;

        const updates = req.body;

        const id_uuid = v5(id.toString(), NIL);

        const existingCase = await casosRepository.findCaseById(id_uuid)

        const newCase = {
                ...existingCase,
                ...updates
        }

        await casosRepository.updateCase(id_uuid,newCase)

        res.status(200).json(newCase)


}

module.exports = {
   getAllCasos,
   getCasoById,
   createCase,
   updateCase,
   parcialUpdateCase
}