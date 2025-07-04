'use client'
import api from '@/lib/api'
import { Receita } from '@/lib/type';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import ReceitaCard from '@/components/ReceitaCard';

export default function ReceitasPage() {
    //cria o estado inicial do array de receitas como vazio
    const [receitas, setReceitas] = useState<Receita[]>([]);
    //Assim que a pagina renderizar, fazemos a requisição das receitas na API
    useEffect(()=>{
        const fetchReceitas = async () => {
            try {
                const resposta = await api.get<Receita[]>('/receitas/todas')
                setReceitas(resposta.data);
            } catch (error) {
                console.error('Erro ao buscar receitas:', error);
            }
        }
        fetchReceitas();
    }, [])

    return(
        <main className="flex-grow py-8">
            
        </main>
    );
};
