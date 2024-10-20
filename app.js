import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/routes.js';
import connectMongo from './src/config/database.js';
import {consultaMensagemSQS} from './src/service/awsSQS.js';

const app = express();
dotenv.config();
app.use(express.json());

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Fila SQS Disponivel http://localhost:${process.env.PORT}/api/cep`);
})

connectMongo();

app.use('/api',routes);

setInterval(consultaMensagemSQS,5000);

export default app;