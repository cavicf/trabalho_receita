//O Next.js usa por convenção o arquivo middleware.ts ou middleware.js no diretório principal
//O middleware define as rotas publicas e privadas e o que fazer em cada caso

// import "@/app/page.css"
import { redirect } from "next/navigation"

export default function Home() 
{
  //Vai mandar inicialmente para a tela de login
  //Se tiver já logado, vai passar pelo middleware e jogar pro /home
  redirect('/login');
}