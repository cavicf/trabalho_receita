import fs from 'fs'
import path from 'path'
import { Receita } from '@/lib/type'
import { editarReceita } from '@/lib/EditarActions'
import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  const filePath = path.resolve('src/db/receitas-cadastradas.json')
  const receitas: Receita[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const receita = receitas.find(r => r.id === Number(params.id))

  if (!receita) return <div className="text-center mt-10 text-white">Receita não encontrada</div>

  return (
    <form
      action={async (formData) => {
        'use server'
        const receitaEditada: Receita = {
          id: receita.id,
          receita: formData.get('receita') as string,
          ingredientes: formData.get('ingredientes') as string,
          modo_preparo: formData.get('modo_preparo') as string,
          tipo: formData.get('tipo') as string,
          link_imagem: formData.get('imagemData') as string ?? receita.link_imagem
        }
        await editarReceita(receitaEditada)
        redirect('/favoritos')
      }}
      className="min-h-screen w-full p-6 bg-[#fff2ed] text-[#5e2b1a] flex flex-col justify-center"
    >
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">Editar receita</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome da receita *</label>
            <input
              name="receita"
              defaultValue={receita.receita}
              placeholder="Ex.: Macarronada"
              className="bg-[#fff2ed] border border-orange-300 rounded-xl p-3 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingredientes (separe por vírgula) *</label>
            <textarea
              name="ingredientes"
              defaultValue={receita.ingredientes}
              placeholder="Ex.: Uma xícara de creme de leite, 200g de macarrão"
              className="bg-[#fff2ed] border border-orange-300 rounded-xl p-3 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modo de preparo (separe por vírgula) *</label>
            <textarea
              name="modo_preparo"
              defaultValue={receita.modo_preparo}
              placeholder="Ex.: 1. Cozinhe o macarrão. 2. Adicione o molho. 3. Mexa bem."
              className="bg-[#fff2ed] border border-orange-300 rounded-xl p-3 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo *</label>
            <select
              name="tipo"
              defaultValue={receita.tipo}
              className="bg-[#fff2ed] border border-orange-300 rounded-xl p-3 w-full"
              required
            >
              <option value="Salgado">Salgado</option>
              <option value="Doce">Doce</option>
              <option value="Agridoce">Agridoce</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">Imagem da receita</label>
          <div className="relative border-2 border-dashed border-orange-300 rounded-xl w-full h-60 flex items-center justify-center overflow-hidden bg-white">
            {receita.link_imagem ? (
              <img
                src={receita.link_imagem}
                alt="Imagem atual"
                className="object-contain max-h-full"
              />
            ) : (
              <span className="text-sm text-orange-600 text-center">
                Nenhuma imagem disponível
              </span>
            )}
          </div>
          <input
            type="hidden"
            name="imagemData"
            defaultValue={receita.link_imagem}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <a
          href="/favoritos"
          className="bg-white border border-orange-500 text-orange-600 px-6 py-2 rounded-xl font-semibold hover:bg-orange-50 transition"
        >
          CANCELAR
        </a>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-400 transition"
        >
          SALVAR
        </button>
      </div>
    </form>
  )
}
