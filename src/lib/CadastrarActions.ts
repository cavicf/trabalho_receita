'use server'

import fs from 'fs/promises'
import path from 'path'
import { Receita } from './type'
import ConexaoBD from './conexaoDB'

// Caminho para o arquivo JSON DENTRO da pasta app/db
const CAMINHO_ARQUIVO = path.join(process.cwd(), 'src', 'db', 'receitas-cadastradas.json')

export async function salvarReceitaCriada(novaReceita: Receita) {
  try {
    console.log('[DEBUG] Caminho do arquivo:', CAMINHO_ARQUIVO)

    let receitas: Receita[] = []

    try {
      const dados = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8')
      receitas = JSON.parse(dados)
    } catch (leituraErro) {
      console.warn('[WARN] Não foi possível ler o arquivo. Será criado novo:', leituraErro)
      receitas = []
    }

    receitas.push(novaReceita)

    await fs.writeFile(CAMINHO_ARQUIVO, JSON.stringify(receitas, null, 2), 'utf-8')
    console.log('[OK] Receita salva com sucesso!')
  } catch (error) {
    console.error('Erro ao salvar receita:', error)
    throw new Error('Erro ao salvar receita no arquivo JSON')
  }
}

export async function getReceitasCadastradas(): Promise<Receita[]> {
  return await ConexaoBD.retornaBD("receitas-cadastradas.json");
}

export async function excluirReceita(id: number) {
  const receitas: Receita[] = await ConexaoBD.retornaBD("receitas-cadastradas.json");
  const atualizadas = receitas.filter(r => r.id !== id);
  await ConexaoBD.armazenaBD("receitas-cadastradas.json", atualizadas);
  return atualizadas;
}