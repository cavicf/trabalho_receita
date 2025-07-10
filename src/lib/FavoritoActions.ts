"use server";

import ConexaoBD from "./conexaoDB";
import { Receita } from "@/lib/type";

//guarda o nome do arquivo para que o conexaoDB encontre o json
const arquivo = "favorites.json";

//função que adiciona uma receita na lista de favoritas
export async function addFavorito(receita: Receita) {
    const favoritos = await ConexaoBD.retornaBD(arquivo);
    favoritos.push(receita);
    await ConexaoBD.armazenaBD(arquivo, favoritos);
}

//função que remove uma receita da lista de favoritos 
export async function removerFavorito(id: number) {
    const favoritos = await ConexaoBD.retornaBD(arquivo);
    const atualizados = favoritos.filter((fav: Receita) => fav.id !== id);
    await ConexaoBD.armazenaBD(arquivo, atualizados);
}

//funçao que verifica se uma receita consta na lista de favoritos, retornando true ou false
export async function estaFavoritado(id: number) {
    const favoritos = await ConexaoBD.retornaBD(arquivo)
    return favoritos.some((receita: Receita) => receita.id === id);
}

export async function getReceitasFavoritas(): Promise<Receita[]> {
    return await ConexaoBD.retornaBD(arquivo);
}