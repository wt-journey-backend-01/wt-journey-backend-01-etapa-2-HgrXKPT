const casosRepository = require("../repositories/casosRepository")
const agenteRepository = require('../repositories/agentesRepository')
const { v4: uuidv4 } = require('uuid');
const { validate: isUuid } = require('uuid');

function getAllCasos(req, res) {

        const casos = casosRepository.findAll()
        res.status(200).json(casos);
}

function getCasoById(req, res){
        const {id} = req.params;
        if(!id){
              return  res.status(400).json({
                        "mensagem": "Id não fornecido"
                })
        }

        if(!isUuid(id)){
              return  res.status(404).json({
                        "mensagem" 
                        : "id não é um UUID válido"
                })
        }

        try{
        const caso = casosRepository.findCaseById(id)

        res.status(200).json(caso)
        }catch(error){
               return res.status(404).json({
                        "message": "Caso não foi encontrado"
                })
        }
        

        
}


function createCase(req,res){

        const{id: _,titulo, descricao, status, agente_id} = req.body;


        const id_uuid = uuidv4();
        //verificar se id existe

        if(!isUuid(agente_id)){
               return res.status(400).json(
                        {
                                "mensagem" : "Id do agente invalido"
                        }
                )
        }

        try {
        agenteRepository.findAgentById(agente_id);
        } catch (error) {
        return res.status(404).json({ mensagem: "Agente não encontrado" });
    }

        


        const newCase = {
                id: id_uuid,
                titulo: titulo,
                descricao: descricao,
                status: status,
                agente_id: agente_id
        }

        casosRepository.addCases(newCase);

        res.status(201).json(newCase);
}

async function updateCase(req, res){

        const {id} = req.params;

        const{id: _, titulo, descricao, status, agente_id: _ignored} = req.body;
        
        if(!isUuid(id)){
               return res.status(404).json({
                        "mensagem" : "Id invalido"
                })
        }
        if(!titulo || titulo.trim() === ''){
                res.status(400).json({mensagem: "Formato do titulo incorreto ou vazio"})
        }
        if(!descricao || descricao.trim() === ''){
                res.status(400).json({mensagem: "Formato da descricao incorreto ou vazio"})
        }
        if (status !== "aberto" || status !== "solucionado") {
        return res.status(400).json({ mensagem: "Status deve ser 'aberto' ou 'solucionado'" });
    }

        //verificar se id existe
        try{
                casosRepository.findCaseById(id)
        }catch(Error){
                res.status(404).json({
                        mensagem: "Caso não encontrado"
                })
        }



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
                return res.status(404).json({
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

function deleteCase(req,res) {
        const {id} = req.params;

        if(!id){
                return res.status(400).json({
                        "mensagem" : "Id não enviado"
                })
        }

        if(!isUuid(id)){
                return res.status(404).json({
                        "mensagem" : "Id invalido"
                })
        }

        casosRepository.deleteCase(id)
        res.status(204).send()
        
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCase,
   updateCase,
   parcialUpdateCase,
   deleteCase
}