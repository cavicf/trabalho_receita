import { Receita } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from 'lucide-react'

//Transforma o nome da receita retirando caracteres especiais e espaços ja que utilizremos ele como rota para página específica
const url = (text: string) => {
    return text
    .toLowerCase()
    .normalize('NFD')                
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')            
    .replace(/[^\w\-]+/g, '')        
    .replace(/\-\-+/g, '-')          
    .replace(/^-+/, '')              
    .replace(/-+$/, '')              
}
interface ReceitaCardProps{
    receita: Receita;
}

export default function ReceitaCard({receita}: ReceitaCardProps){
    return(
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
                <Link href={`/receitas/${url(receita.receita)}`} className="flex justify-center gap-2 bg-orange-500 w-full py-2 rounded-xl hover:bg-orange-400 transition-colors" ><Eye />Ver Receita</Link>
                <button className="cursor-pointer border border-yellow-950 rounded-xl p-3"><Heart color={'#6b4134'} size={18}/></button>
            </div>
        </div>
    );
};
