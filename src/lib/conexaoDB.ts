import {promises as fs} from 'fs';
import path from "path";

//Funçao que faz a leitura do arquivo e retorna os dados dele e formato JSON que torna mais fácil de mainpular  
async function retornaBD(arquivo: string): Promise<Array<any>>
{
    const dbPath = path.join(process.cwd(),'src','db',arquivo);
    const dados = await fs.readFile(dbPath,'utf-8');
    return JSON.parse(dados);
}

//Essa função faz a sobrescrit do arquivo quando ele é alterado, seja reovendo ou adicionando uma receita
async function armazenaBD(arquivo: string, dados: any)
{
    const dbPath = path.join(process.cwd(),'src','db',arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados,null,2));
}

const ConexaoBD = {
    retornaBD,
    armazenaBD
}

export default ConexaoBD;