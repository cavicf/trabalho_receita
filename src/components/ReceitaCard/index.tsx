"use client"
import { Receita } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from 'lucide-react'
import { useEffect, useState } from 'react';
import { adicionarFavorito, removerFavorito } from '@/lib/favoritoActions';

interface ReceitaCardProps {
    receita: Receita;
}

//Componente de card de receita, que exibe o tipo, nome e imagem da receita vinda da API externa
export default function ReceitaCard({ receita }: ReceitaCardProps) {

    //Guarda o valor que controla se uma receita foi favoritada ou não, inicia como false
    const [favoritado, setFavoritado] = useState(false);

    //Ao renderizar uma receita, verifica se ela está presente na lista de favoritos para preservar o estado de favoritado dela mesmo que as páginas troquem
    // Removido o uso de estaFavoritado, pois não existe
    // Se quiser implementar, crie a função em favoritoActions.ts

    //Função assincrona para adicionar ou remover uma receita do arquivo de favoritos
    const toggleFavorito = async () => {
        try {
            //se a receita ja estiver favoritada, vamos remover ela da lista de favoritos
            if (favoritado) {
                await removerFavorito(receita.id);
                //se não, vamos adicionar ela na lista de favoritos
            } else {
                await adicionarFavorito(receita);
            }
            //por fim, alteramos o estado da receita estar favoritada ou não
            setFavoritado(!favoritado);
        } catch (error) {
            console.error('Erro ao favoritar/desfavoritar: ', error)
        }
    };

    return (
        <div className="lg:w-2xs w-3xs p-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow transition-shadow">
            <div className="relative h-48 w-full">
                <Image
                    src={receita.link_imagem}
                    alt={receita.receita}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="flex flex-col gap-1 mt-3 text-black">
                <span className="text-xs text-gray-800 bg-gray-200 px-1 rounded-sm w-fit">{receita.tipo}</span>
                <h3 className="text-yellow-950 font-medium">{receita.receita}</h3>
            </div>
            <div className="flex mt-3 gap-3">
                {/* Utilizamos a função pra transformar o nome da receita para passar como rota pra página de receita específica */}
                <Link href={`/receitas/${receita.id}`} className="flex justify-center items-center gap-2 bg-orange-500 w-full py-2 rounded-xl active:scale-95 hover:bg-orange-400 transition-colors" ><Eye />Ver Receita</Link>
                {/* Chamamos a função de favoritar no evento de click */}
                <button onClick={toggleFavorito} className="cursor-pointer active:scale-95 transition-transform border border-[#A66541] rounded-xl p-3">{favoritado ? <Heart color="red" fill="red" /> : <Heart color={'#A66541'} />}</button>
            </div>
        </div>
    );
};
