const casosRepository = require("../repositories/casosRepository")
const { v4: uuidv4 } = require('uuid');
const { validate: isUuid } = require('uuid');

function getAllCasos(req, res) {

        const casos = casosRepository.findAll()
        res.status(200).json(casos);
}

function getCasoById(req, res){
        const {id} = req.params;
        if(!id){
                res.status(400).json({
                        "mensagem": "Id não fornecido"
                })
        }
        try{

        if(!isUuid(id)){
                res.status(400).json({
                        "mensagem" 
                        : "id não é um UUID válido"
                })
        }

        const caso = casosRepository.findCaseById(id)

        res.status(200).json(caso)
        }catch(error){
                res.status(400).json({
                        "message": "caso não foi encontrado"
                })
        }
        

        
}


async function createCase(req,res){

        const{titulo, descricao, status, agente_id } = req.body;


        const id_uuid = uuidv4();
        //verificar se id existe

        if(!isUuid(agente_id)){
                res.status(400).json(
                        {
                                "mensagem" : "Id do agente invalido"
                        }
                )
        }
        


        const newCase = {
                id: id_uuid,
                titulo: titulo,
                descricao: descricao,
                status: status,
                agente_id: agente_id
        }

       await casosRepository.addCases(newCase);

        res.status(201).json(newCase);
}

async function updateCase(req, res){

        const {id} = req.params;

        const{ titulo, descricao, status } = req.body;
        
        if(!isUuid(id)){
                res.status(400).json({
                        "mensagem" : "Id invalido"
                })
        }

        //verificar se id existe
        



        const newCase = {
                titulo: titulo,
                descricao: descricao,
                status: status,
        }

        await casosRepository.updateCase(id,newCase)

        res.status(200).json(newCase)

}

async function parcialUpdateCase(req,res){
        const{id} = req.params;

        if(!isUuid(id)){
                res.status(400).json({
                        "message": "id invalido"
                })
        }
        
        const {id: _,...updates} = req.body;



        const existingCase = await casosRepository.findCaseById(id)

        const newCase = {
                ...existingCase,
                ...updates
        }

        await casosRepository.updateCase(id,newCase)

        res.status(200).json(newCase)


}

async function deleteCase(req,res) {
        const {id} = req.params;

        if(!id){
                res.status(400).json({
                        "mensagem" : "Id não enviado"
                })
        }

        if(!isUuid(id)){
                res.status(400).json({
                        "mensagem" : "Id invalido"
                })
        }

        await casosRepository.deleteCase(id)
        res.status(200).json({
                "mensagem": "Caso deletado"
        })
        
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCase,
   updateCase,
   parcialUpdateCase,
   deleteCase
}