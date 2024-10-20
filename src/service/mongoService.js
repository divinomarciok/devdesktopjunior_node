import Cep from '../model/cepModel.js';
import { consultaCepApi } from './apiservice.js';


const TrataMensagemFila = async (id) => {

    try {

        const cepId = await Cep.findById(id);

        if (cepId.status == "PENDENTE" ) {

            const dataCep = await consultaCepApi(cepId.cep);

            const cepAtualizado = await atualizaStatus(id,dataCep)

            console.log('Documento atualizado:', cepAtualizado);

            return cepAtualizado;

        }else{
            console.log("Status mensagem SQS nao identificado");
        }

    } catch (error) {
        console.error('Erro ao buscar CEP pelo ID: ', error)
    }

};


async function atualizaStatus(id,dataCep){

    if(dataCep != null){
        
        const cepAtualizado = await Cep.findByIdAndUpdate(
            id,
            {
                data: dataCep,
                status: 'CONCLUIDO'
            },
            { new: true }
        );
            return cepAtualizado;
    }else{
        const cepAtualizado = await Cep.findByIdAndUpdate(
            id,
            {
                data: '',
                status: 'REJEITADO'
            },
            { new: true }
        );
        return cepAtualizado;
    }

}
export { TrataMensagemFila };


