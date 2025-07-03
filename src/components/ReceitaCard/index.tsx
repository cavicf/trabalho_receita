import { Receita } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from 'lucide-react'

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
        <div>
            <div>
                <Image 
                    src={receita.link_imagem}
                    alt={receita.receita}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <span>{receita.tipo}</span>
                <h3>{receita.receita}</h3>
            </div>
            <div>
                <Link href={`/receitas/${url(receita.receita)}`}><Eye/>Ver Receita</Link>
                <button><Heart/></button>
            </div>
        </div>
    );
};
