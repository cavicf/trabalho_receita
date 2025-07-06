import { verificaValidadeSessao } from "@/lib/sessao";
import {NextRequest, NextResponse} from "next/server";



//regex retirada diretamente da documentação do NextJS
//https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const rotasPublicas = [
    '/',
    '/login',
    '/cadastro'
]

export async function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname;

    //Valida as credenciais da requisicao (se possui um Token de Sessao Acessado) 
    //Se possui: valida a sessao e permite o acesso a rotas privadas
    const sessao = await verificaValidadeSessao();

    if(rotasPublicas.includes(pathname) && sessao)
    {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
    
    if(!sessao && !rotasPublicas.includes(pathname)){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    
    return NextResponse.next();
      

}