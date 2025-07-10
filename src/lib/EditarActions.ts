import fs from 'fs'
import path from 'path'
import { Receita } from './type'

const filePath = path.resolve('src/db/receitas-cadastradas.json')

export async function buscarReceitaPorId(id: number): Promise<Receita | null> {
  const data = fs.readFileSync(filePath, 'utf-8')
  const receitas: Receita[] = JSON.parse(data)
  return receitas.find(r => r.id === id) || null
}

export async function editarReceita(receitaEditada: Receita): Promise<void> {
  const data = fs.readFileSync(filePath, 'utf-8')
  let receitas: Receita[] = JSON.parse(data)
  receitas = receitas.map(r => (r.id === receitaEditada.id ? receitaEditada : r))
  fs.writeFileSync(filePath, JSON.stringify(receitas, null, 2))
}
