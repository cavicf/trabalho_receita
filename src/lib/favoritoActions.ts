"use server";

import ConexaoBD from "./conexaoDB";
import { Receita } from "@/lib/type";

const arquivo = "favorites.json";

export async function adicionarFavorito(receita: Receita) {
    const favoritos = await ConexaoBD.retornaBD(arquivo);
    favoritos.push(receita);
    await ConexaoBD.armazenaBD(arquivo, favoritos);
}

export async function removerFavorito(receita: string) {
    const favoritos = await ConexaoBD.retornaBD(arquivo);
    const atualizados = favoritos.filter((fav: Receita) => fav.receita !== receita);
    await ConexaoBD.armazenaBD(arquivo, atualizados);
}

// Função para verificar se uma receita está favoritada pelo id
export async function estaFavoritado(id: number) {
    const favoritos = await ConexaoBD.retornaBD(arquivo);
    return favoritos.some((fav: Receita) => fav.id === id);
}
