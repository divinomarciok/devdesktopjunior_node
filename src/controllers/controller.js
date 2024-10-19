import Cep from '../model/cepModel.js'
import {enviaMensagm} from '../service/awsService.js';
import  {consultaCepApi} from '../service/apiservice.js';
import { buscaIdPendente } from '../service/mongoService.js';


const receberCep = async (req, res) => {
    try {
        const { cep } = req.body;

        const newCep = new Cep({cep});
        await newCep.save();

        const sqsmensagem = JSON.stringify({ id: newCep._id }); 
        console.log(newCep._id);
        res.status(200).json({ message: 'CEP recebido', cep });   


        if(newCep._id){
            enviaMensagm(sqsmensagem);  
        }else{
            console.log("Sem ID do banco, mensagem não enviada");
        }        

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
};


const atualizaRegistroBD = async (cepData) => {

    try {

        const response = await consultaCepApi(cepData.cep);



        cepData = ({

        })

        await cepData.save();
        console.log(response);
        
    } catch (error) {
        
    }

}



export {receberCep, atualizaRegistroBD};