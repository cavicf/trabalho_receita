'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Receita } from '@/lib/type'
import { estaFavoritado } from '@/lib/FavoritoActions'
import { Pencil, Trash, Eye } from 'lucide-react'

export default function FavoritosPage() {
  const [favoritas, setFavoritas] = useState<Receita[]>([])
  const [naoFavoritas, setNaoFavoritas] = useState<Receita[]>([])
  const [busca, setBusca] = useState('')
  const [abaAtiva, setAbaAtiva] = useState<'favoritas' | 'naoFavoritas'>('favoritas')
  const router = useRouter()

  useEffect(() => {
    const locais: Receita[] = JSON.parse(localStorage.getItem('receitas') || '[]')

    const carregar = async () => {
      const favs: Receita[] = []
      const naoFavs: Receita[] = []
      for (const r of locais) {
        if (await estaFavoritado(r.id)) {
          favs.push(r)
        } else {
          naoFavs.push(r)
        }
      }
      setFavoritas(favs)
      setNaoFavoritas(naoFavs)
    }
    carregar()
  }, [])

  const handleExcluir = (id: string) => {
    const atualizadas = [...favoritas, ...naoFavoritas].filter((r) => String(r.id) !== String(id))
    localStorage.setItem('receitas', JSON.stringify(atualizadas))
    setFavoritas(atualizadas.filter(r => estaFavoritado(r.id)))
    setNaoFavoritas(atualizadas.filter(r => !estaFavoritado(r.id)))
  }

  const receitasAtuais = abaAtiva === 'favoritas' ? favoritas : naoFavoritas
  const receitasFiltradas = receitasAtuais.filter((r) =>
    r.receita.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <main className="flex flex-col items-center py-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500">Receitas favoritas</h1>
      <p className="text-center text-gray-700 mt-2">
        Aqui você vê as receitas que você <span className="text-red-500">cadastrou</span> e as que você{' '}
        <span className="text-green-600">favoritou</span> das outras pessoas!
      </p>

      {/* Barra de busca + botão cadastrar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 w-full max-w-4xl px-4">
        <input
          type="text"
          placeholder="🔍 Pesquisar receita"
          className="w-full sm:w-[70%] border border-orange-300 rounded-md px-4 py-2"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          onClick={() => router.push('/cadastrar')}
          className="bg-orange-500 text-white rounded-md px-6 py-2 hover:bg-orange-600"
        >
          + CADASTRAR RECEITA
        </button>
      </div>

      {/* Abas */}
      <div className="flex gap-8 mt-8 border-b-2">
        <button
          onClick={() => setAbaAtiva('favoritas')}
          className={`pb-2 font-semibold ${abaAtiva === 'favoritas' ? 'text-orange-600 border-b-4 border-orange-600' : 'text-gray-400'}`}
        >
          Minhas receitas
        </button>
        <button
          onClick={() => setAbaAtiva('naoFavoritas')}
          className={`pb-2 font-semibold ${abaAtiva === 'naoFavoritas' ? 'text-orange-600 border-b-4 border-orange-600' : 'text-gray-400'}`}
        >
          Outras receitas
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl px-4">
        {receitasFiltradas.map((r) => (
          <div
            key={String(r.id)}
            className="border-4 border-[#F06E42] rounded-2xl overflow-hidden shadow hover:shadow-md transition"
          >
            <img src={r.link_imagem} alt={r.receita} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Categoria</span>
              <h3 className="font-semibold text-md text-[#1C120D]">{r.receita}</h3>
            </div>
            <div className="flex items-center justify-around border-t px-4 py-2">
              <button
                onClick={() => router.push(`/receitas/${r.id}`)}
                className="text-white bg-[#F06E42] p-2 rounded-md hover:scale-105 transition"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => router.push(`/favoritos/${r.id}`)}
                className="text-white bg-[#F06E42] p-2 rounded-md hover:scale-105 transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleExcluir(String(r.id))}
                className="text-white bg-[#F06E42] p-2 rounded-md hover:scale-105 transition"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
