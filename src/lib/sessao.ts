'use server';

import { SignJWT, jwtVerify } from "jose"; //npm i jose
import { cookies } from "next/headers";


async function aberturaSessaoToken(token: string){
    //Token no arquivo ".env"
    //Chave aleatorio: terminal -> node -> require('crypto').randomBytes(64).toString('hex')
    //Biblioteca "jose": verifica se ha um token valido e extrai o payload (carga útil)
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN);
    
    try{
        const {payload} = await jwtVerify(token, chaveCodificada, {
            algorithms: ["HS256"],
        });
        return payload;
    }catch(erro){
        console.log('Erro ao verificar session token', erro);
    }
    
}

export async function criarSessaoToken(userId: string, userEmail: string){
    
    //Converte a chave secreta do .env em um formato que a bim (jose) entende (Uint8Array)
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN);
    //Seta o tempo para sessao expirar
    const expiresAt = Date.now() + 3600 * 1000; //Posteriormente aumentado


    //Cria a sessao do usuario
    //Eh feita uma "assinatura" do payload
    //Espeficido o algoritmo de criptografia como HS256
    const sessao = await new SignJWT({userId, userEmail}).setProtectedHeader({
        alg: 'HS256'
    })
    .setExpirationTime('1h') //Define um tempo para expirar
    .sign(chaveCodificada); //Assina o token

    //Criar o cookieStore primeiro (motivo: eh uma funcao async)
    const cookieStore = await cookies();
    
    //Pelo cookieStore busca-se(get) e salvar(set) cookies no navegador
    cookieStore.set('session', sessao, {
        expires: expiresAt * 1000, //Aumenta o tempo dessao para 1h
        path: '/',
        httpOnly: true
    });
}

export async function verificaValidadeSessao(){

    const sessionCookie = (await cookies()).get('session');

    if(sessionCookie)
    {
        const {value} = sessionCookie;
        const session = await aberturaSessaoToken(value);
        return session;
    }

    return false;

}

export async function deletaCookieSessao(){

    //Asim como na criacao da sessao
    //Criar o cookieStore primeiro (motivo: eh uma funcao async)
    const cookieStore = await cookies();

    cookieStore.delete('session');


}
