// Soh esta disponivel nas rotas de (auth)
import Image from "next/image";
import '@/app/style/auth-layout.css';
import { Toaster } from "react-hot-toast";

export default function AuthLayout({children}: {children: React.ReactNode})
{
    return(
            <main className="bg-gradient-to-br from-[#f06e42] to-[#d44309]">
                <section className="auth-container">
                    <div className="container-esquerda">
                        <Image
                            src="/login/logo-pratopronto.png"
                            alt='logo pratopronto'
                            width={250}
                            height={200}
                            className="img-logo"
                        /> 
                        {children}
                    </div>
                    <div className="container-direita">
                        <Image
                            src="/login/img-background.png"
                            alt='imagem tela de login'
                            fill
                            className="img-background"
                        /> 
                    </div>
                </section>
                <Toaster position="top-right" />
            </main>
    )
}