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
      className="min-h-screen bg-gradient-to-br from-[#f06e42] to-[#d44309] flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-7xl bg-[#FFF4EF] rounded-3xl p-12 shadow-2xl border border-orange-200 flex flex-col">
        <h1 className="text-center text-3xl font-bold text-[#EA4E1B] mb-10">Editar receita</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {/* Formulário */}
          <div className="flex flex-col gap-6">
            <label className="text-[#803C1C] font-semibold text-sm">
              Nome da receita *
              <input
                name="receita"
                defaultValue={receita.receita}
                placeholder="Ex.: Macarronada"
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                required
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Ingredientes (separe por vírgula) *
              <textarea
                name="ingredientes"
                defaultValue={receita.ingredientes}
                placeholder="Ex.: Uma xícara de creme de leite, 200g de macarrão"
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                rows={3}
                required
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Modo de preparo (separe por numeração e ponto final) *
              <textarea
                name="modo_preparo"
                defaultValue={receita.modo_preparo}
                placeholder="Ex.: 1. Cozinhe o macarrão. 2. Adicione o molho. 3. Mexa bem."
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                rows={3}
                required
              />
            </label>

            <label className="text-[#803C1C] font-semibold text-sm">
              Tipo *
              <select
                name="tipo"
                defaultValue={receita.tipo}
                className="w-full border border-[#803C1C]/30 p-3 rounded-xl mt-1 bg-white"
                required
              >
                <option value="Salgado">Salgado</option>
                <option value="Doce">Doce</option>
                <option value="Agridoce">Agridoce</option>
              </select>
            </label>
          </div>

          {/* Imagem */}
          <div className="flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#EA4E1B]/40 rounded-2xl bg-white h-[440px]">
            {receita.link_imagem ? (
              <>
                <img
                  src={receita.link_imagem}
                  alt="Imagem atual"
                  className="max-h-[350px] object-contain w-full rounded-xl"
                />
              </>
            ) : (
              <span className="text-sm text-orange-600 text-center">
                Nenhuma imagem disponível
              </span>
            )}
            <input type="hidden" name="imagemData" defaultValue={receita.link_imagem} />
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-4 mt-8 md:flex-row justify-between">
          <a
            href="/favoritos"
            className="w-full md:w-[200px] text-center border border-orange-500 text-orange-600 font-semibold py-3 rounded-md hover:bg-orange-50 active:scale-90 transition-transform"
          >
            CANCELAR
          </a>
          <button
            type="submit"
            className="w-full md:w-[200px] bg-orange-600 text-white font-bold py-3 rounded-md hover:bg-orange-700 active:scale-90 transition-transform"
          >
            SALVAR
          </button>
        </div>
      </div>
    </form>
  )
}
