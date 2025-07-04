'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import NotFound from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';
import { Receita } from '@/lib/type';
import { Heart } from 'lucide-react';

export default function ReceitaEspecificaPage() {
    const { id } = useParams();
    const [receita, setReceita] = useState<Receita | null>(null);

    useEffect(() => {
        async function fetchReceita() {
            try {
                const resposta = await api.get<Receita>(`/receitas/${id}`);
                setReceita(resposta.data);
            } catch(error){
                console.error('Erro ao encontrar receita: ', error)
            }
        }
        fetchReceita();
    }, [id]);

    if (!receita){
        return NotFound();
    }

    return (
    <main className="flex-grow py-8">
        <div className="container mx-auto">
            <div>
                <Link href="/receitas">Voltar</Link>
                <h1>{receita.receita}</h1>
            </div>
            <div>
                <div className='relative aspect-[1/1] w-[50%]'>
                    <Image 
                        src={receita.link_imagem} 
                        alt={receita.receita} 
                        fill 
                        className="object-cover" 
                    />
                </div>
                {receita.tipo}
            </div>
            <div>
                <h2>Ingredientes</h2>
                {receita.ingredientes}
            </div>
            <div>
                <h2>Modo de Preparo</h2>
                {receita.modo_preparo}
            </div>
            <div>
                <Link href={'/receitas'}>EXPLORAR MAIS</Link>
                <button><Heart/>FAVORITAR</button>
            </div>
        </div>
    </main>
    );
}
