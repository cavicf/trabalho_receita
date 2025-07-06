//import '@/app/styles/logout.css';
import { redirect } from "next/navigation";
import { deletaCookieSessao } from "@/lib/sessao"

export default function LogoutButton(){

    const logoutAction = async () => {
        await deletaCookieSessao();
        redirect('/login');
    }

    return(
        // precisa configurar no css
        <form action={logoutAction}>
            <button className="flex items-center gap-2 px-6 py-2 border-2 border-[#A66541] rounded-xl text-[#A66541] font-bold hover:bg-[#F2D2C2] transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="#A66541" strokeWidth="2" />
                <path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#A66541" strokeWidth="2" />
                </svg>
                Logout
            </button>
        </form>

    )
    
}