import Cep from '../model/cepModel.js'
import {enviaMensagmSQS} from '../service/awsSQS.js';

const receberCep = async (req, res) => {
    try {
        const { cep } = req.body;

        const newCep = new Cep({cep})
        await newCep.save();
        
        const sqsmensagem = JSON.stringify({ id: newCep._id }); 
      
        res.status(200).json({ message: 'CEP recebido', cep });   

        if(newCep._id){
            enviaMensagmSQS(sqsmensagem);  
        }else{
            console.log("Sem ID do banco, mensagem não enviada");
        }        

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
};


export {receberCep};