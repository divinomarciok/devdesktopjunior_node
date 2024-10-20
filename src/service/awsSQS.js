import { SQSClient,SendMessageCommand,ReceiveMessageCommand,DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { TrataMensagemFila } from './mongoService.js';


const sqs = new SQSClient({ region: 'sa-east-1' })

const enviaMensagmSQS = async (mensagem) => {

    const params = {
        QueueUrl: process.env.SQS_URL,
        MessageBody: mensagem,
    };

    try {

        const data = await sqs.send(new SendMessageCommand(params));
        console.log('Mensagem na fila: ', data.MessageId);

    } catch (err) {
        console.log('Error', err);
    }

}



const consultaMensagemSQS = async ()=> {

    const params = {
        QueueUrl: process.env.SQS_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
    };
    
    try {

        const recebido = await sqs.send(new ReceiveMessageCommand(params));
    
        if(recebido.Messages){

        const dataMessage = JSON.parse(recebido.Messages[0].Body); 
        console.log(dataMessage.id);

        if(await TrataMensagemFila (dataMessage.id)){

            const deleteParams = {
            QueueUrl: process.env.SQS_URL,
            ReceiptHandle: recebido.Messages[0].ReceiptHandle, 
            };
                

            await sqs.send(new DeleteMessageCommand(deleteParams));
            console.log("Mensagem deletada")

        }        
          
    }else{
        console.log("Nenhuma mensagem");
}

    } catch (error) {
        console.log(error);
    }

}





export {enviaMensagmSQS,consultaMensagemSQS};

