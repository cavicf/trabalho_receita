'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { salvarReceitaCriada } from '@/lib/CadastrarActions'
import { Receita } from '@/lib/type'

export default function CadastrarReceita() {
  const router = useRouter()

  const [receita, setReceita] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modo_preparo, setModoPreparo] = useState('')
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

    const novaReceita: Receita = {
      id: Date.now(),
      receita,
      ingredientes,
      modo_preparo,
      tipo,
      link_imagem: imagem ?? '',
    }

    try {
      await salvarReceitaCriada(novaReceita)
      router.push('/favoritos')
    } catch (error) {
      alert('Erro ao salvar receita.')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f06e42] to-[#d44309] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl bg-[#FFF4EF] rounded-3xl p-12 shadow-2xl border border-orange-200 flex flex-col">
        <h1 className="text-center text-3xl font-bold text-[#EA4E1B] mb-10">Cadastrar receita</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {/* Formulário */}
          <div className="flex flex-col gap-6">
            <label className="text-[#803C1C] font-semibold text-sm">
              Nome da receita *
              <input
                type="text"
                placeholder="Ex.: Macarronada"
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                value={receita}
                onChange={(e) => setReceita(e.target.value)}
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Ingredientes (separe por vírgula) *
              <textarea
                placeholder="Ex.: Uma xícara de creme de leite, 200g de macarrão"
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                rows={3}
                value={ingredientes}
                onChange={(e) => setIngredientes(e.target.value)}
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Modo de preparo (separe por numeração e ponto final) *
              <textarea
                placeholder="Ex.: 1.Cozinhe o macarrão. 2.Adicione o molho. 3.Mexa bem."
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                rows={3}
                value={modo_preparo}
                onChange={(e) => setModoPreparo(e.target.value)}
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Tipo *
              <select
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
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
          <div className="flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#EA4E1B]/40 rounded-2xl bg-white h-[440px]">
            {imagem ? (
              <>
                <img src={imagem} alt="Prévia" className="max-h-[350px] object-contain w-full rounded-xl" />
                <button
                  className="mt-4 text-sm text-red-500 underline"
                  onClick={() => setImagem(null)}
                >
                  Trocar imagem
                </button>
              </>
            ) : (
              <>
                <p className="text-[#803C1C] mb-2 font-medium">Imagem da receita</p>
                <label className="cursor-pointer text-orange-500 underline text-sm mt-2 hover:text-orange-700">
                  Arraste o arquivo aqui ou faça upload do dispositivo
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

        {/* Botões SALVAR e CANCELAR (em coluna) */}
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => router.push('/')}
            className="w-full border border-orange-500 text-orange-600 font-semibold py-3 rounded-md hover:bg-orange-50 transition"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSalvar}
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-md hover:bg-orange-700 transition"
          >
            SALVAR
          </button>
        </div>
      </div>
    </div>
)
}
