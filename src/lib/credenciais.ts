'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./conexaoDB";

import bcrypt from 'bcrypt'; //Para criptografar a senha. npm i bcrypt |  npm install bcrypt @types/bcrypt
import { LoginCredenciais } from "../app/(auth)/login/page"
import { UsuarioCredenciais } from "../app/(auth)/cadastro/page"
import { criarSessaoToken } from "./sessao";

const arquivoUsuariosBD = 'usuarios-db.json';


export async function criacaoUsuario(data: UsuarioCredenciais){

    const nomeUsuario = data.nomeUsuario
    const email = data.email
    const password = data.password

    const passwordCriptografado = await bcrypt.hash(password, 10)

    const novoUsuario = {
        id: crypto.randomUUID(),
        nomeUsuario,
        email,
        password: passwordCriptografado
    }

    const usuarios = await ConexaoBD.retornaBD(arquivoUsuariosBD)

    for(const usuario of usuarios)
    {
        if(email === usuario.email)
        {
            return {error: 'Usuário ou senha inválido'}
        }
    }
    usuarios.push(novoUsuario)
    await ConexaoBD.armazenaBD(arquivoUsuariosBD, usuarios)
    return {success: 'Usuário criado com usuário'}

}

export async function validacaoCredenciais (data: LoginCredenciais) { 
    
    const email = data.email.trim() as string
    const password = data.password.trim() as string

    const usuarios = await ConexaoBD.retornaBD(arquivoUsuariosBD)

    //Varredura dos usuarios para encontrar se ha algum igual
    const usuario = usuarios.find((user) => user.email === email)
    //Nao encontrou um usuario e vai enviar um erro
    if(!usuario)
    {
        return {error: 'Usuário ou senha inválidos'}
    }
    
    const isMatch = await bcrypt.compare(password, usuario.password)

    if(isMatch)
    {
        await criarSessaoToken(usuario.id, usuario.email);
        redirect('/home');
    }
    else
    {
        return {error: 'Usuário ou senha inválidos'};
    }

}