'use client'

import '@/app/style/login-cadastro.css';
import Image from 'next/image';
// import usuarioIcone from '/iconeUsuario.png';
// import senhaIcone from '/iconeCadeado.png';
import z from 'zod'; //validacao de front | npm i zod
import toast from 'react-hot-toast'; //mensagens do canto direito | npm i react-hot-toast
import Link from 'next/link'; //roteaia e navega entre as paginas
import { validacaoCredenciais } from '@/lib/credenciais';

//interface com o objeto do tipo LoginCredenciais
export interface LoginCredenciais{
    email: string,
    password: string
}

//Funcao para validar is dados do front-end
const ValidacaoLogin = z.object({
    email: z.string().trim().email('Email no formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(8, {message: 'Senha requer pelo menos 8 caracteres'})
})

export default function PaginaLogin(){
    
    //formData, parametros que viarem da extracao
    //FormData: dados extraidos de um formulario
    const executarLogin = async (formData: FormData) => {

        //Extracao credenciais login pelos inputs do usuário
        const credenciais: LoginCredenciais = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        //Validando credenciais com a biblioteca zod
        //Safeparse: validação das credenciais pelo zod || 
        //Puxa a funcao de ValidacaoLogin, se nao tiver no formato configurado na funcao devolve um erro
        const validacaoLoginUsuario = ValidacaoLogin.safeParse(credenciais)

        //Caso nao haja sucesso
        if(!validacaoLoginUsuario.success)
        {
            //Vai devolver varios erros junto: 'issues'
            //Para cada erro 'issue': vai concatenar na mensagem final
            //Concatenacao das mensagens
            let mensagemErro = '';
            validacaoLoginUsuario.error.issues.forEach((issue) => {
                mensagemErro = mensagemErro + issue.message + '. ';
            });

            //Mensagem que ira aparecer para o usuario
            toast.error(mensagemErro);

            return;
        }

        //Realizacao da Autenticao do Login do Usuario
        //Chamada de uma funcao externa (outro arquivo)
        //Essa funcao roda do lado do servidor ('use server') e nao possui nenhum funcionalidade do cliente
        //Resolve o problema de quando precisamos de funcionalidades do cliente e depois rodar algum processo do lado do servidor
        const resultLoginUsuario = await validacaoCredenciais(credenciais as LoginCredenciais)
        //So vai entrar no if, se nao conseguiu logar e criar uma sessao
        //Ou seja, recebeu uma resposta '.error'
        //A "resposta" do '.sucess' é o proprio redirecionamento para /home
        if(resultLoginUsuario)
        {
            //Estou passando a mensagem de erro que o servidor devolveu
            toast.error(resultLoginUsuario.error)
            return
        }

    }

    return(
        <form action={executarLogin}>
            <h1 className="titulo">Login</h1>
            <div className="container-formulario">
                <section className="grupo-input">
                    <Image
                        src='/login/iconeUsuario.png'
                        alt='icone simbolizando o email do usuario'
                        width={24}
                        height={24}
                    />
                    <input type="email" name='email' id='email' placeholder='E-mail *' arial-label='Email' required/>
                </section>

                <section className="grupo-input">
                    <Image
                        src='/login/iconeCadeado.png'
                        alt='icone simbolizando a senha do usuario'
                        width={24}
                        height={24}
                    />
                    <input type="password" name='password' id='password' placeholder='Senha *' arial-label='Senha' required/>
                    {/* <span className="senha-link">Esqueci minha senha</span> */}
                </section>
            </div>
            <button className="botão">Entrar</button>
            <div className="cadastro-link">
                Não possui uma conta? <Link href={'/cadastro'}>Cadastre-se aqui</Link>
            </div>
        </form>
    )
}