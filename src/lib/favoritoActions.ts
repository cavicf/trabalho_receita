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
