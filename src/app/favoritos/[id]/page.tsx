'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';
import { Receita } from '@/lib/type';
import { excluirReceita, getReceitasCadastradas } from '@/lib/CadastrarActions';
import { ChevronLeft, Trash } from 'lucide-react';


export default function ReceitaEspecificaPage() {
    const { id } = useParams();
    const [receita, setReceita] = useState<Receita | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchReceita() {
            try {
                const resposta = await getReceitasCadastradas();
                const receitaLocal = resposta.find((receitaLoc) => receitaLoc.id === Number(id));
                if(receitaLocal){
                    setReceita(receitaLocal);
                }
            } catch (error) {
                console.error('Erro ao encontrar receita extern:', error)
            } finally {
                setCarregando(false)
            }
        }
        fetchReceita();
    }, [id]);


    const [favoritado, setFavoritado] = useState(false);

    if (carregando) {
        return (
            <main className='flex flex-grow items-center justify-center bg-[#F2EBE8]'>
                <p className='text-2xl text-[#F06E42]'>Carregando receita...</p>
            </main>
        );
    }

    if (!receita) {
        return NotFound();
    }

    const ingredientes = receita.ingredientes.split(',');
    const modoPreparo = receita.modo_preparo.split(/(?=\d+\.\s)/);

    const router = useRouter();

    async function handleExcluir() {
      if (!receita) return;

      try {
        await excluirReceita(receita.id);
        router.push('/favoritos');
      } catch (error) {
        console.error('Erro ao excluir receita:', error);
        alert('Não foi possível excluir a receita.');
      }
    }

    return (
        <main className="flex-grow bg-[#F2EBE8] py-8">
            <div className="flex flex-col gap-8 container bg-white py-8 px-12 rounded-3xl w-[50%] mx-auto">
                <div className='lg:relative flex flex-col lg:flex-row items-center lg:justify-between lg:gap-0 gap-5'>
                    <Link href="/favoritos" className='flex w-fit gap-1 items-center border border-[#995E4D] text-[#995E4D] px-3 active:scale-90 transition-transform py-1 rounded-md'>
                        <ChevronLeft size={20} />
                        VOLTAR
                    </Link>
                    <h1 className='lg:absolute lg:left-1/2 lg:-translate-x-1/2 text-2xl lg:text-4xl text-[#F06E42]'>{receita.receita}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='relative aspect-[16/10] w-full h-[20rem]'>
                        <Image
                            src={receita.link_imagem}
                            alt={receita.receita}
                            fill
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <h2 className="text-xl text-gray-800 bg-gray-200 px-1 rounded-sm w-fit">{receita.tipo}</h2>
                </div>
                <div className='flex flex-col text-[#1C120D] gap-2'>
                    <h2 className='text-2xl font-semibold'>Ingredientes</h2>
                    <ul className='flex flex-col gap-1'>
                        {ingredientes.map((ingrediente) => (
                            <li key={ingrediente} className='flex intems-center gap-2'><input type="checkbox" />{ingrediente}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col text-[#1C120D] gap-2'>
                    <h2 className='text-2xl font-semibold'>Modo de Preparo</h2>
                    <ul className='flex flex-col gap-1'>
                        {modoPreparo.map((passo) => (
                            <li key={passo} className='flex intems-center gap-2'>{passo}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex gap-4 w-full'>
                    <Link href={'/favoritos'} className='flex w-full justify-center items-center border border-[#995E4D] text-[#995E4D] px-3 active:scale-90 transition-transform py-1 rounded-xl'>EXPLORAR MAIS</Link>
                    <button onClick={handleExcluir} className='flex justify-center items-center gap-2 bg-orange-500 w-full py-2 rounded-xl active:scale-95 hover:bg-orange-400 transition-colors'><Trash size={18}/>Excluir</button>
                </div>
            </div>
        </main>
    );
}
