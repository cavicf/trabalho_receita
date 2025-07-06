'use client'

import Image from 'next/image'

import '@/app/style/login-cadastro.css';
import z from 'zod'; 
import toast from 'react-hot-toast'; 
import { criacaoUsuario } from '@/lib/credenciais';
import { redirect } from 'next/navigation';

//interface com o objeto do tipo LoginCredenciais
export interface UsuarioCredenciais{
    nomeUsuario: string,
    email: string,
    password: string
}

//Regra de validacao para os campos de criacao de usuario com a biblioteca zod
const ValidacaoCriacaoUsuario = z.object({
    nomeUsuario: z.string().trim().min(1, 'Nome é obrigatório'),
    email: z.string().trim().email('Email no formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(8, {message: 'Senha requer pelo menos 8 caracteres'}),
    confirmaPassword: z.string({message: 'Insira novamente a senha'}).trim().min(8, {message: 'Senha requer pelo menos 8 caracteres'})
})
//Regra de validacao para validar se a senhas esta correta
//Utiliza o '.refine' da biblioteca zod
.refine((dados) => dados.password === dados.confirmaPassword, {
    message: "Senhas não são iguas",
    path: ['confirmaPassword']
});


export default function CriacaoUsuario() {
    
    const criarUsuario = async (formData: FormData) => {
        
        const dadosNovoUsuario = {
            nomeUsuario: formData.get('nomeUsuario') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmaPassword: formData.get('confirmaPassword') as string
        }

        const validacaoCadastroUsuario = ValidacaoCriacaoUsuario.safeParse(dadosNovoUsuario)

        if(!validacaoCadastroUsuario.success)
        {
            //Vai devolver varios erros junto 'issues'
            //Para cada erro 'issue' vai concatenar na mensagem final
            let mensagemErro = ''
            validacaoCadastroUsuario.error.issues.forEach((issue) => {
                mensagemErro = mensagemErro + issue.message + '. '
            })

            //Mensagem que ira aparecer para o usuario
            toast.error(mensagemErro)

            return
        }

        //Realizacao da Autenticao
        //Em "dadosNovoUsuario as UsuarioCredenciais" estou passando somento os parametros que eu quero enviar
        //Chamada de uma funcao externa (outro arquivo) que nao possui nenhuma funcionalidade do lado do cliente
        //Essa funcao roda do lado do servidor e nao possui nenhum funcionalidade do cliente
        //Resolve o problema de quando precisamos de funcionalidades do cliente e depois rodar algum processo do lado do servidor
        const resultCriacaoUsuario = await criacaoUsuario(dadosNovoUsuario as UsuarioCredenciais)
        if(resultCriacaoUsuario.error)
        {
            //Estou passando a mensagem de erro que o servidor devolveu
            toast.error(resultCriacaoUsuario.error)
        }
        else if(resultCriacaoUsuario.success)
        {
            //Estou passando a mensagem de sucesso que o servidor devolveu
            toast.success(resultCriacaoUsuario.success)
            redirect('/login')
        }
    }
    
    return(
        <form action={criarUsuario}>
            <h1 className="titulo">Cadastro</h1>
            <div className="container-formulario">
                <section className="grupo-input">
                    <Image
                        src='/login/iconeUsuario.png'
                        alt='icone simbolizando a credencial do usuario'
                        width={24}
                        height={24}
                    />
                    <input type="string" name='nomeUsuario' id='nomeUsuario' placeholder='Nome Usuário *' arial-label='Nome Usuário' required/>
                </section>

                <section className="grupo-input">
                    <Image
                        src='/login/iconeEmail.png'
                        alt='icone simbolizando a credencial do usuario'
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
                </section>

                <section className="grupo-input">
                    <Image
                        src='/login/iconeCadeado.png'
                        alt='icone simbolizando a senha do usuario'
                        width={24}
                        height={24}
                    />
                    <input type="password" name='confirmaPassword' id='confirmaPassword' placeholder='Confirme a senha *' arial-label='Confirme a senha' required/>
                </section>

            </div>
            <button className="botão">Criar conta</button>
        </form>
    )
}