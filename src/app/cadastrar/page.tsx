'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { salvarReceitaCriada } from '@/lib/CadastrarActions'
import { Receita } from '@/lib/type'

export default function CadastrarReceita() {
  const router = useRouter()

  const [receita, setReceita] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [tipo, setTipo] = useState('Salgado')
  const [imagem, setImagem] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagem(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSalvar = async () => {
    const passos = modoPreparo
      .split(',')
      .map((passo, i) => `${i + 1}. ${passo.trim()}`)
      .join(', ')

    const novaReceita: Receita = {
      id: Date.now(),
      receita,
      ingredientes,
      modo_preparo: passos,
      tipo,
      link_imagem: imagem ?? '',
      IngredientesBase: ingredientes.split(',').map(item => item.trim()), // ← Correção aqui
    }

    try {
      await salvarReceitaCriada(novaReceita)
      router.push('/receitas')
    } catch (error) {
      alert('Erro ao salvar receita.')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md mt-8">
      <h1 className="text-center text-2xl font-bold text-orange-600 mb-6">Cadastrar receita</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formulário */}
        <div className="flex flex-col gap-4">
          <label className="text-[#4A2F1B] font-medium">
            Nome da receita *
            <input
              type="text"
              placeholder="Ex.: Macarronada"
              className="w-full border p-2 rounded mt-1"
              value={receita}
              onChange={(e) => setReceita(e.target.value)}
            />
          </label>

          <label className="text-[#4A2F1B] font-medium">
            Ingredientes (separe por vírgula) *
            <textarea
              placeholder="Ex.: 1 xícara de leite, 200g de macarrão"
              className="w-full border p-2 rounded mt-1"
              rows={3}
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
            />
          </label>

          <label className="text-[#4A2F1B] font-medium">
            Modo de preparo (separe por vírgula) *
            <textarea
              placeholder="Ex.: Cozinhe o macarrão, Adicione o molho, Mexa bem"
              className="w-full border p-2 rounded mt-1"
              rows={3}
              value={modoPreparo}
              onChange={(e) => setModoPreparo(e.target.value)}
            />
          </label>

          <label className="text-[#4A2F1B] font-medium">
            Tipo *
            <select
              className="w-full border p-2 rounded mt-1"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option>Salgado</option>
              <option>Doce</option>
              <option>Agridoce</option>
            </select>
          </label>
        </div>

        {/* Upload da imagem */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 text-center">
          {imagem ? (
            <>
              <img src={imagem} alt="Prévia" className="w-full rounded-md" />
              <button
                className="mt-2 text-red-600 underline"
                onClick={() => setImagem(null)}
              >
                Trocar imagem
              </button>
            </>
          ) : (
            <>
              <p className="text-[#4A2F1B] mb-2">Imagem da receita</p>
              <label className="cursor-pointer text-blue-600 underline text-sm mt-2">
  Clique para fazer upload
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />
</label>

            </>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push('/')}
          className="border border-orange-600 text-orange-600 px-6 py-2 rounded hover:bg-orange-50"
        >
          CANCELAR
        </button>
        <button
          onClick={handleSalvar}
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          SALVAR
        </button>
      </div>
    </div>
  )
}
