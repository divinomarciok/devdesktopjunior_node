import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async() => {
    try {

        await mongoose.connect(process.env.MONGO_URI);        
        console.log('Mongo conennect!');
        
    } catch (error) {
        console.error('Erro ao conectar com banco : ',error);         
    }
}


export default connectMongo;