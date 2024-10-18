import Cep from '../model/cepModel.js'

const receberCep = async (req, res) => {
    try {
        const { cep } = req.body;
        console.log(cep);

        const newCep = new Cep({cep});
        await newCep.save();
        console.log(newCep._id);

        res.status(200).json({ message: 'CEP recebido', cep });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
};

export default receberCep;