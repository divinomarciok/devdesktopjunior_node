import axios from 'axios';


const consultaCepApi = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if(response.status=="200" && !response.data.erro){

            console.log(response.data)
            
            return response.data; 
        }

    } catch (error) {
        console.error('Erro ao consultar o CEP: ', error.message);
    }
};

export {consultaCepApi};
