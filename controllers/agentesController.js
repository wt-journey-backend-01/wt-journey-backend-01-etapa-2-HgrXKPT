const agenteRepository = require('../repositories/agentesRepository')
const { v4: uuidv4 } = require('uuid');
const { validate: isUuid } = require('uuid');
const { validateDate } = require('../utils/validators'); // Importe a função

async function findAll(req, res){
    const agentes = await agenteRepository.findAll()
    res.status(200).json(agentes)
}

async function findById(req,res){
    const {id} = req.params;
    
     if(!id){
              return  res.status(400).json({
                        "mensagem": "Id não fornecido"
                })
        }
        

        if(!isUuid(id)){
              return  res.status(400).json({
                        "mensagem" : "id não é um UUID válido"
                })
        }


        try{
            const agente = await agenteRepository.findAgentById(id)
            if(!agente){
                return res.status(404).json({
                mensagem: "Agente não encontrado"
            });
            }

        res.status(200).json(agente)
        }catch(Error){
            return res.status(404).json({
                mensagem: "Agente não encontrado"
            });
        }
        


}
async function addAgente(req,res){
    const {id: _, ...agente} = req.body
    if(!agente.cargo || !agente.nome || !agente.dataDeIncorporacao){
        return res.status(400).json({
            mensagem: "Todos os campos (cargo, nome, dataDeIncorporacao) devem ser preenchidos"
        });
    
    }

    if(!validateDate(agente.dataDeIncorporacao)){
        return res.status(400).json({
            mensagem: "Data de incorporação inválida. Use o formato YYYY-MM-DD e certifique-se de que não é uma data futura"
        });
    }
    try{
        const newAgent = {
        id: uuidv4(),
        ...agente
    }

    await agenteRepository.addAgents(newAgent)
    res.status(201).json(newAgent)
    }catch(Error){
         console.error('Erro ao adicionar agente:', error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
    

}

async function updateAgent(req,res){
    const {id} = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body

    if(!isUuid(id)){
        return res.status(404).json({
            mensagem: "ID inválido"
        })
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            mensagem: "Todos os campos (nome, dataDeIncorporacao, cargo) devem ser preenchidos"
        });
    }

    if(!validateDate(agente.dataDeIncorporacao)){
        return res.status(400).json({
            mensagem: "Data de incorporação inválida. Use o formato YYYY-MM-DD e certifique-se de que não é uma data futura"
        });
    }



    try{

        const existingAgent = await agenteRepository.findAgentById(id);
        if (!existingAgent) {
            return res.status(404).json({
                mensagem: "Agente não encontrado"
            });
        }

        const newAgent = {
        nome,
        dataDeIncorporacao,
        cargo
    }

    await agenteRepository.updateAgents(id,newAgent)
    res.status(200).json(newAgent)

    }catch(Error){
        const newAgent = {
        nome,
        dataDeIncorporacao,
        cargo
    }

    await agenteRepository.updateAgents(id,newAgent)
    res.status(200).json(newAgent)
    }

    
}

async function partialUpdate(req,res){
    const {id} = req.params;
    const{id: _, ...agente} = req.body

     if (!isUuid(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    if (agente.dataDeIncorporacao && !validateDate(agente.dataDeIncorporacao)) {
        return res.status(400).json({
            mensagem: "Data de incorporação inválida. Use o formato YYYY-MM-DD e certifique-se de que não é uma data futura"
        });
    }

    try {
        // Verifica se o agente existe
        const existingAgent = await agenteRepository.findAgentById(id);
        if (!existingAgent) {
            return res.status(404).json({
                mensagem: "Agente não encontrado"
            });
        }

        const newAgent = {
            ...existingAgent,
            ...agente
        };

        await agenteRepository.partialUpdateAgents(id, agente);
        res.status(200).json(newAgent);


    } catch (error) {
        console.error('Erro ao atualizar parcialmente agente:', error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

async function deleteAgent(req,res) {
        const { id } = req.params;

    // Verifica se o ID na URL é válido
    if (!isUuid(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    try {
        // Verifica se o agente existe
        const existingAgent = await agenteRepository.findAgentById(id);
        if (!existingAgent) {
            return res.status(404).json({
                mensagem: "Agente não encontrado"
            });
        }

        await agenteRepository.deleteAgent(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar agente:', error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports={
    findAll,
    findById,
    addAgente,
    updateAgent,
    partialUpdate,
    deleteAgent
}