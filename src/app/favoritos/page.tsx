'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Receita } from '@/lib/type'
import { getReceitasFavoritas } from '@/lib/FavoritoActions'
import { Search, Plus } from 'lucide-react'
import { excluirReceita, getReceitasCadastradas } from '@/lib/CadastrarActions'
import ReceitaCard from '@/components/ReceitaCard'
import ReceitaUsuarioCard from '@/components/ReceitaUsuarioCard'

export default function FavoritosPage() {
  const [receitasCadastradas, setReceitasCadastradas] = useState<Receita[]>([]);
  const [receitasFavoritas, setReceitasFavoritas] = useState<Receita[]>([]);
  const [busca, setBusca] = useState('')
  const [abaAtiva, setAbaAtiva] = useState<'favoritas' | 'naoFavoritas'>('naoFavoritas')
  const router = useRouter()

  useEffect(() => {
    async function carregar() {
      const minhas = await getReceitasCadastradas();
      const favoritas = await getReceitasFavoritas();
      setReceitasCadastradas(minhas);
      setReceitasFavoritas(favoritas);
    }
    carregar();
  }, []);

  const receitasAtuais = abaAtiva === 'favoritas' ? receitasFavoritas : receitasCadastradas
  const receitasFiltradas = receitasAtuais.filter((r) =>
    r.receita.toLowerCase().includes(busca.toLowerCase()) ||
    r.tipo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <main className="flex-grow py-8 bg-white">
      <div className='container mx-auto w-full lg:w-235 flex flex-col items-center gap-2'>
        <h1 className="text-4xl font-bold text-orange-500">Receitas favoritas</h1>
        <p className="w-[60%] text-2xl text-center text-yellow-950">
          Aqui você vê as receitas que você <span className="text-red-500">cadastrou</span> e as que você{' '}
          <span className="text-red-500">favoritou</span> das outras pessoas!
        </p>

        {/* Barra de busca + botão cadastrar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 w-full max-w-4xl px-4">
          <div className='relative w-full'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2' size={18} color={'#A66541'} />
            <input type="text" placeholder='Pesquisar receita' className='w-full text-[#A66541] py-3 px-11 bg-[#F2EBE8] outline-none rounded-md  placeholder-[#A66541]' value={busca} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setBusca(e.target.value))} />
          </div>
          <button
            onClick={() => router.push('/cadastrar')}
            className="flex w-[35%] gap-1 items-center border border-[#995E4D] text-[#995E4D] px-3 py-2 active:scale-90 transition-transform py-1 rounded-md"
          >
            <Plus size={18}/>
            CADASTRAR RECEITA
          </button>
        </div>

        {/* Abas */}
        <div className="flex gap-8 mt-8 border-b-2">
          <button
            onClick={() => setAbaAtiva('naoFavoritas')}
            className={`pb-2 text-xl font-thin ${abaAtiva === 'naoFavoritas' ? 'text-[#6B4134] border-b-4 border-[#6B4134]' : 'text-[#995E4D]'}`}
          >
            Minhas receitas
          </button>
          <button
            onClick={() => setAbaAtiva('favoritas')}
            className={`pb-2 text-xl font-thin  ${abaAtiva === 'favoritas' ? 'text-[#6B4134] border-b-4 border-[#6B4134]' : 'text-[#995E4D]'}`}
          >
            Outras receitas
          </button>
        </div>

        {/* Cards */}
        <section className='rounded-3xl w-full bg-[url("/background/background.png")] bg-cover bg-center p-3'>
          <div className='flex flex-wrap gap-6 justify-center lg:justify-start'>
              {receitasFiltradas.map((receita) => {
                if (abaAtiva === 'naoFavoritas') {
                  return (
                    <ReceitaUsuarioCard
                      key={receita.id}
                      receita={receita}
                      onExcluir={async (id) => {
                        await excluirReceita(id);
                        setReceitasCadastradas((receitas) => receitas.filter(r => r.id !== id));
                      }}
                    />
                  );
                } else {
                  return (
                    <ReceitaCard
                      key={receita.id}
                      receita={receita}
                    />
                  );
                }
              })}
          </div>
        </section>
      </div>
    </main>
  )
}
