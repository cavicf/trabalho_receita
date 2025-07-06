"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center min-h-[80vh] bg-white px-4">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-12 mt-12">
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-6xl font-extrabold text-[#1C120D] leading-tight mb-2">Bem-vindo ao <br />Prato Pronto!</h1>
          <p className="text-2xl text-[#1C120D] max-w-xl mb-4">
            Aqui, cozinhar é mais do que seguir instruções – é compartilhar sabores, histórias e descobertas. O <span className="text-[#F06E42] font-semibold">Prato Pronto</span> é uma plataforma onde você pode criar, salvar e explorar receitas incríveis, sejam suas ou de uma vasta base do universo gastronômico.
          </p>
          <Link href="/receitas" className="bg-[#F06E42] hover:bg-orange-400 text-white font-bold rounded-xl px-8 py-3 text-lg transition-colors">EXPLORAR RECEITAS</Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image src="/figures/prato.png" alt="Prato pronto" width={640} height={640} className="object-contain drop-shadow-2xl" priority />
        </div>
      </div>
    </main>
  );
}
