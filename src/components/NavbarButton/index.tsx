"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavbarButtonProps extends LinkProps {
    children: ReactNode;
    selected?: boolean;
    className?: string;
}

export default function NavbarButton({ href, children, selected, className, ...props }: NavbarButtonProps) {
    const pathname = usePathname();
    const isSelected = selected ?? pathname === href;

    return (
        <Link
            href={href}
            className={[
                "px-6 py-2 rounded-2xl text-base font-semibold text-[#1C120D] transition-all duration-150 focus:outline-none",
                isSelected
                    ? "bg-[#F2D2C2] text-[#A66541] shadow-none"
                    : "bg-transparent hover:bg-[#F7F0ED] active:bg-[#F2D2C2] active:text-[#A66541]",
                className
            ].join(" ")}
            {...props}
        >
            {children}
        </Link>
    );
}
