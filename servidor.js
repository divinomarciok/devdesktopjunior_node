import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/routes.js';
import connectMongo from './src/config/database.js'

const app = express();

dotenv.config();
const pastaLocal = process.cwd();

app.use(express.static(pastaLocal));

app.use(express.json());

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Aplicativo rodando");
})
connectMongo();
app.use('/api',routes);

export default app;