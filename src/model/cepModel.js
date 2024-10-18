import mongoose from 'mongoose';

const cepModelo = new mongoose.Schema({
    cep: String,
    status:{type: String, default: 'PENDENTE'},
    data: mongoose.Schema.Types.Mixed, 
});

const Cep = mongoose.model('Cep', cepModelo);

export default Cep;