'use client'
import api from '@/lib/api'
import { Receita } from '@/lib/type';
import { useEffect, useState } from 'react';
import ReceitaCard from '@/components/ReceitaCard';
import { Search } from 'lucide-react'

//Página de explorar receitas, onde são exibidas as receitas vindas da API externa, na qual pode ser feita uma pesquisa por tipo e nome da receita
export default function ReceitasPage() {
    //cria o estado inicial do array de receitas como vazio
    const [receitas, setReceitas] = useState<Receita[]>([]);
    //Assim que a pagina renderizar, fazemos a requisição das receitas na API
    useEffect(() => {
        const fetchReceitas = async () => {
            try {
                const resposta = await api.get<Receita[]>('/receitas/todas')
                if(resposta){
                    setReceitas(resposta.data);
                }
            } catch (error) {
                console.error('Erro ao buscar receitas:', error);
            }
        }
        fetchReceitas();
    }, []);

    //PesquisarReceita guarda o valor que o usuario digitara, inicialmente o estado dele é vazio e conforme o usuario digita esse valor é atualizado
    const [pesquisarReceita, setPesquisarReceita] = useState('');
    //Em seguida filtramos as receitas da API de acordo com o que o usuario digitou, que está guardado em pesquisarReceita
    const filtrarReceita = receitas.filter((receita: Receita) => (
        receita.receita.toLowerCase().includes(pesquisarReceita.toLowerCase()) ||
        receita.tipo.toLowerCase().includes(pesquisarReceita.toLowerCase())
    ));

    return (
        <main className="flex-grow py-8 bg-white">
            <div className='container mx-auto w-full lg:w-235 flex flex-col gap-10'>
                <section className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center gap-2'>
                        <h1 className='text-4xl text-orange-500'>Explorar receitas</h1>
                        <p className='w-[50%] text-2xl text-center text-yellow-950'>
                            Aqui você vê as receitas das pessoas
                            que também adoram o <span className='text-red-500'>universo gastronômico!</span>
                        </p>
                    </div>
                    <div className='relative w-full'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2' size={18} color={'#A66541'} />
                        <input type="text" placeholder='Pesquisar receita' className='w-full text-[#A66541] py-3 px-11 bg-[#F2EBE8] rounded-md  placeholder-[#A66541]' value={pesquisarReceita} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setPesquisarReceita(e.target.value))} />
                    </div>
                </section>
                <section className='rounded-3xl w-full bg-[url("/background/background.png")] bg-cover bg-center p-3'>
                    <div className='flex flex-wrap gap-6 justify-center lg:justify-start'>
                        {filtrarReceita.map((receita) => (
                            <ReceitaCard key={receita.id} receita={receita} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};
