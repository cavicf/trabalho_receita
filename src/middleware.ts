import { verificaValidadeSessao } from "@/lib/sessao";
import {NextRequest, NextResponse} from "next/server";

//Regex que intercepta todas as requisições feitas na aplicação
//Define quais URLs o middleware deve interceptar
//Alguns exemplos do que é interceptado: /login, /cadastro, /home, /receitas
//Alguns que nao intercepta: /api/..., /_next/static/..., /_next/image/...
//Esta dizendo para o programa: "execute o middleware para todas as rotas, exceto para APIs, arquivos do sistema e imagens"
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const rotasPublicas = [
    '/',
    '/login',
    '/cadastro'
]

export async function middleware(req: NextRequest){

    //Extrai o caminho (path) da URL acessada pelo usuário,
    const pathname = req.nextUrl.pathname;

    //Valida as credenciais da requisicao (se possui um Token de Sessao Acessado) 
    //Se possui: valida a sessao e permite o acesso a rotas privadas
    const sessao = await verificaValidadeSessao();

    //Verifica se esta em uma rota pública e já está logado
    //Direciona para /home do projeto
    if(rotasPublicas.includes(pathname) && sessao)
    {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
    
    //Verifica se não está logado e não está em uma rota pública
    //Direciona para o /login para poder iniciar uma sessão
    if(!sessao && !rotasPublicas.includes(pathname)){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    //Faz com que a requisição continue seu fluxo normalmente
    //No caso de nenhuma das condições de redirecionamento tenham sido atendida, garante um retorn
    return NextResponse.next();
      

}