'use client'
import api from '@/lib/api'
import { Receita } from '@/lib/type';
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function ReceitasPage() {
    const [receitas, setReceitas] = useState<Receita[]>([]);

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
