import axios, { AxiosInstance } from 'axios'

//Criando uma instãncia para a API externa, facilitando nossas requisições definindo ela como url base 
const api: AxiosInstance = axios.create({
    baseURL: 'https://api-receitas-pi.vercel.app',
})

export default api