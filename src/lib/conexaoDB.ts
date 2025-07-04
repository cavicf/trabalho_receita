import fs from 'fs'
import path from 'path'
import {Receita} from '@/lib/type'

//Salvando o caminho para encontrar o arquivo e poder fazer escrita e leitura
const caminhoArquivo = path.resolve(process.cwd(), 'src', 'db', 'favorites.json');

//Essa função faz a leitura do arquivo retornando os dados em forato JSON, sendo um array do tipo Receita, que são as receitaas ja favoritadas do usuario
const lerFavoritos = (): Receita[] => {
    const arquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(arquivo);
};

//Essa função faz a escrita no arquivo, onde recebe um array de receitas para sobrescrever no arquivo. Ela é do tipo void pois não retorna nada, apenas faz a escrita no arquivo
const escreverFavoritos = (dados: Receita[]): void => { 
    fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null,2), 'utf-8');
};

//Essa função faz a adição efetivamente de uma receita no arquivo dos favoritos do usuario, também é do tipo void pois não retorna nada, apenas faz a adição no array
const addFavoritos = (receita:Receita): void => {
    const favoritos = lerFavoritos();
    favoritos.push(receita);
    escreverFavoritos(favoritos);
    
};

//Essa função faz a remoção de uma receita no array de receitas favoritas do usuario, também é do tipo void pois não retorna nada, só remove a receita do array
const removeFavoritos = (receita:Receita): void => {
    const favoritos = lerFavoritos().filter(r => r.receita !== receita.receita);
    escreverFavoritos(favoritos);
};

export {lerFavoritos, escreverFavoritos, addFavoritos, removeFavoritos};
