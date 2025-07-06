"use client";
import Link from "next/link";
import Image from "next/image";
import NavbarButton from "@/components/NavbarButton/index";
import LogoutButton from '@/components/NavbarButton/btn-logout'

export default function Header() {

    return (
        <header className="flex items-center justify-between px-12 py-4 bg-white border-b border-[#E5E8EB] w-full">
            <div className="flex items-center gap-10">
                <Link href="/">
                    <Image
                        src="/figures/logo.png"
                        alt="Logo PratoPronto"
                        width={180}
                        height={42}
                        className="h-10 w-auto"
                        priority
                    />
                </Link>
                <nav className="flex items-center gap-2 ml-8">
                    <NavbarButton href="/">Home</NavbarButton>
                    <NavbarButton href="/favoritos">Receitas favoritas</NavbarButton>
                    <NavbarButton href="/receitas">Explorar receitas</NavbarButton>
                    <NavbarButton href="/cadastrar">Cadastrar receitas</NavbarButton>
                </nav>
            </div>
            {/* <Link href="/login" className="flex items-center gap-2 px-6 py-2 border-2 border-[#A66541] rounded-xl text-[#A66541] font-bold hover:bg-[#F2D2C2] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" stroke="#A66541" strokeWidth="2" />
                    <path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#A66541" strokeWidth="2" />
                </svg>
                LOGIN
            </Link> */}
            <LogoutButton/>
        </header>
    );
}
