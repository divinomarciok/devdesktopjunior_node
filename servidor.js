import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/routes.js';
import connectMongo from './src/config/database.js';
import {consultaMensagens} from './src/service/awsService.js';

const app = express();
dotenv.config();
app.use(express.json());

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Fila SQS Disponivel http://localhost:3000/api/cep");
})

connectMongo();
app.use('/api',routes);


setInterval(consultaMensagens,5000);

export default app;