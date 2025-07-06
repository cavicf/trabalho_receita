import Header from '@/components/Header';
import Image from "next/image";
import Link from "next/link";

//Personalização da página de erro 404, quando algo não é encontrado pelo servidor
export default function NotFound() {
    return (
        <>
            <Header />
            <main className="flex items-center justify-center flex-grow bg-[#F7E1BA]">
                <div className="flex gap-4">
                    <div className="relative w-[35%] aspect-[1/1]">
                        <Image
                            src='/figures/Snorlax.png'
                            alt="Snorlax triste derrubando comida"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col w-[60%] justify-center text-[#1C120D] gap-8">
                        <div>
                            <h1 className="text-7xl">Oh não...!</h1>
                            <p className="text-3xl">Parece que o Snorlax se <span className="text-[#E53333]">empolgou demais</span> e derrubou essa página no chão...</p>
                            <p className="text-3xl">Mas calma, nem tudo está perdido! Ainda tem muita receita gostosa te esperando</p>
                        </div>
                        <Link href={'/'} className="bg-[#F06E42] py-3 px-4 w-[40%] self-start text-white text-center font-semibold rounded-xl active:scale-95 hover:bg-orange-400 transition-colors">VOLTAR PARA O INÍCIO</Link>
                    </div>
                </div>
            </main>
        </>
    );
};
