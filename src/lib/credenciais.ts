'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./conexaoDB";

import bcrypt from 'bcrypt'; //Para criptografar a senha. npm i bcrypt |  npm install bcrypt @types/bcrypt
import { LoginCredenciais } from "../app/(auth)/login/page"
import { UsuarioCredenciais } from "../app/(auth)/cadastro/page"
import { criarSessaoToken } from "./sessao";

const arquivoUsuariosBD = 'usuarios-db.json';

//Parametro: data, tipo: UsuarioCredenciais (criado no /cadastro/page.tsx)
export async function criacaoUsuario(data: UsuarioCredenciais){

    const nomeUsuario = data.nomeUsuario
    const email = data.email
    const password = data.password

    //Apos receber a senha, deve ser feito sua criptografia
    //Vai aplicar um algoritmo de hash 2^10 || maior o numero, mais lento para criptografar
    //1o: adiciona dados aleatórios à senha antes de aplicar o hash | impede que o criptografia seja facilmente quebrada
    //2o: faz o proceso de hash: transforma em uma sequência irreversível e única de caracteres
    const passwordCriptografado = await bcrypt.hash(password, 10)

    const novoUsuario = {
        id: crypto.randomUUID(), //gera um identificador único para cado novo usuariono formato padrão de 36 caracteres
        nomeUsuario,
        email,
        password: passwordCriptografado //salva a senha que foi criptografada como a variavel "password"
    }

    //Puxa todos os usuario salvos ate o momento em um formato JSON
    const usuarios = await ConexaoBD.retornaBD(arquivoUsuariosBD)

    //Verifica se já um usuário com o email que esta sendo cadastrado
    for(const usuario of usuarios)
    {
        if(email === usuario.email)
        {
            //Se houve: retorna um '.error' para ser mostrado no Toaster
            return {error: 'Usuário ou senha inválido'}
        }
    }
    //Se não exister um email no BD, vai inserir os dados cadastrados no BD
    //Faz um push primeiro no JSON
    usuarios.push(novoUsuario)
    //Sobrescreve o BD do usuario como novo JSON
    await ConexaoBD.armazenaBD(arquivoUsuariosBD, usuarios)
    return {success: 'Usuário criado com usuário'}

}

//Parametro: data, tipo: LoginCredenciais (criado no /login/page.tsx)
export async function validacaoCredenciais (data: LoginCredenciais) { 
    
    const email = data.email.trim() as string
    const password = data.password.trim() as string

    //Puxa o banco de dados dos usuarios cadastrados
    const usuarios = await ConexaoBD.retornaBD(arquivoUsuariosBD)

    //Varredura dos usuarios para encontrar se ha algum igual ao email inserido no login
    const usuario = usuarios.find((user) => user.email === email)
    
    //Se nao encontrou um usuario com um email cadastro: envia um '.error' para o /login/page.tsx
    if(!usuario)
    {
        return {error: 'Usuário ou senha inválidos'}
    }
    
    //Verificacao das senhas: utiliza a lib 'bcrypt'
    //1o: verifica o salt da senha (usuario.password) e extrai esse valor
    //2o: faz o processo de criptografia da senha do input (password) | roda a funcao bcrypt.hash(password, 10)
    //3o: compara a senha salva no banco de dados com a senha inserida no input (password) e verifica se ficaram iguais
    const isMatch = await bcrypt.compare(password, usuario.password)

    //Se as senhas foram iguais
    if(isMatch)
    {
        //Vai criar uma sessão pelo Token do Usuário que utiliza o ID único do usuário e seu email
        //Utiliza o .env com um HASH para auxiliar na criptografia desse hash
        //Depois de criar a sessão e salvar o cookie do navegador, envia para a /home
        await criarSessaoToken(usuario.id, usuario.email);
        redirect('/home');
    }

    //Caso  as senhas não sejam iguais: envia um '.error' para o /login/page.tsx
    else
    {
        return {error: 'Usuário ou senha inválidos'};
    }

}