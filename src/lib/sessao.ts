'use server';

import { SignJWT, jwtVerify } from "jose"; //npm i jose
import { cookies } from "next/headers";


async function aberturaSessaoToken(token: string){
    //Token no arquivo ".env"
    //Chave aleatorio: terminal -> node -> require('crypto').randomBytes(64).toString('hex')
    //Biblioteca "jose": verifica se ha um token valido e extrai o payload (carga útil)
    //Vai puxar o .env aqui para comparar com o Token de Sessão 'token" puxado do Cookie do usuario
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN);
    
    try{
        //{payload}: puxa o padrao payload da sessão, ou seja, { id, email }
        //jwtVerify: verifica se o token JWT é válido e autêntico pela chaveCodificada e o algoritmo de codificação
        //           --> recalcula a assinatura correta com base no conteúdo do token + chave
        //           --> compara a assinatura que veio no 'token' da 'aberturaSessaoToken' com essa nova assinatura 'chaveCodificada'
        const {payload} = await jwtVerify(token, chaveCodificada, {
            algorithms: ["HS256"],
        });
        return payload;
    }catch(erro){
        console.log('Erro ao verificar session token', erro);
    }
    
}

export async function criarSessaoToken(userId: string, userEmail: string){
    
    //Converte a chave secreta do .env em um formato que a lib 'jose' entende
    //Converte uma string para um array de bytes (Uint8Array)
    //Necessário para a função '.sign' da lib jose não aceita uma string como chave
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN);
    //Seta o tempo para sessao do usuario expirar
    const expiresAt = Date.now() + 3600 * 10; //Posteriormente aumentado


    //Cria a sessao do usuario
    //Eh feita uma "assinatura" do payload
    //SignJWT: cria um JWT (Jason Web Token) assinado com o { userId, userEmail }
    //     --> Visível no token, mas não pode ser alterado sem quebrar a assinatura
    const sessao = await new SignJWT({userId, userEmail})
        //setProtectedHeader: define o cabeçalho protegido do JWT
        //     --> Neste caso: espefica o algoritmo de criptografia que esta sendo utilizado 'HS256'
        //     --> //Garante que o JWT não foi alterado após ser assinado
        .setProtectedHeader({ alg: 'HS256' })
        //Define um tempo para o token (JWT) continuar válido
        .setExpirationTime('1h')
        //Assina o token do payload com a chave codificada .env
        //Codifica os dados do Token para nao serem visiveis caso alguem intercepte a transmissao
        .sign(chaveCodificada); 

    //Criar o cookieStore primeiro (motivo: eh uma funcao async)
    //Salva o navegador que voce esta | garante que a sessao so funcione no navegador que o usuario esta acessando
    //Se tentar logar em outro navegar, vai ter que logar de novo
    //'cookies()' | acessar e modificar os cookies do navegador do usuário, no lado do servidor
    const cookieStore = await cookies();
    
    //Pelo cookieStore busca-se(get) e salvar(set) cookies no navegador
    //'session': nome do cookie
    //sessao: valor do cookie, neste caso, o JWT assinado e criptografado
    cookieStore.set('session', sessao, {
        expires: expiresAt * 1000, //Aumenta o tempo dessao para 1h
        path: '/', //Enviado para todas as rotas do site
        httpOnly: true //Protege o cookie contra acesso via JS como document.cookie como ataque (XSS)
    });
}

export async function verificaValidadeSessao(){

    //Acessa os cookies do navegador e procura e armazena aquele com nome 'session'
    const sessionCookie = (await cookies()).get('session');

    if(sessionCookie)
    {
        //{value}: extrai todos os campanhas de forma fragmentada do sessionCookie
        //         --> vai servir para passar esses valores como o 'token' do 'aberturaSessaoToken'
        //         --> vai puxar junto os o { id, email } a assinatu 'sign()' | aqui pega-se uma injecao externa pois nao conhece o .env
        const {value} = sessionCookie;
        //Vai puxar a funcao 'aberturaSessaoToken' para verificar se o Token que obteve é verdadeiro
        //Ou seja, vai verificar se não é um Token adultarado e realmente foi um login feito pelo usuario
        //Evita uma injecao de valor tantando se passar por um usuario
        const session = await aberturaSessaoToken(value);
        return session;
    }

    //Caso nao encontre o cookie, retorna falso
    //Neste caso, usuario nao esta logado
    return false;

}

export async function deletaCookieSessao(){

    //Asim como na criacao da sessao
    //Criar o cookieStore primeiro (motivo: eh uma funcao async)
    //Puxa todos os cookies do navegador do usuario
    const cookieStore = await cookies();

    //Procura aquele com o nome 'session' e o deleta
    cookieStore.delete('session');


}
