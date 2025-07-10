"use client"
import { Receita } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { Edit, Eye, Trash } from 'lucide-react'

interface ReceitaCardProps {
    receita: Receita;
    onExcluir: (id: number) => void;
}

//Componente de card de receita, que exibe o tipo, nome e imagem da receita cadastrada pelo usuario
export default function ReceitaUsuarioCard({ receita, onExcluir }: ReceitaCardProps) {

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
                <Link href={`/favoritos/${receita.id}`} className="flex justify-center items-center gap-2 bg-orange-500 w-full py-2 rounded-xl active:scale-95 hover:bg-orange-400 transition-colors" ><Eye />Ver Receita</Link>
                <button onClick={() => alert('Função de editar ainda não implementada')} className="cursor-pointer active:scale-95 transition-transform border border-[#A66541] rounded-xl p-3"><Edit size={18} color="#A66541"/></button>
                <button onClick={() => onExcluir(receita.id)} className="cursor-pointer active:scale-95 transition-transform border border-[#A66541] rounded-xl p-3"><Trash size={18} color="#A66541"/></button>
            </div>
        </div>
    );
};
