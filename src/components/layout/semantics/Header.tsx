"use client";

import { motion } from "framer-motion";
import { slideInLeft } from "@/lib/motion/variants";
import { useLenis } from "@/components/layout/SmoothScroll";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { SiValorant } from "react-icons/si";

import Navigation from "./Navigation";

export default function Header() {
    const lenis = useLenis();
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = () => {
        if (pathname === "/") {
            lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
        } else {
            router.push("/");
        }
    };

    return (
        <header className="sticky top-0 w-full flex items-center justify-between px-5 py-4 z-50 bg-[#111111] backdrop-blur-md shadow-[0_2px_4px_rgba(0,0,0,0.4),0_7px_13px_-3px_rgba(0,0,0,0.3),0_-3px_0px_inset_rgba(0,0,0,0.2)]">
            <motion.button onClick={handleClick}
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="cursor-pointer border border-[#ff4655]">
                <SiValorant className="h-10 w-10 fill-[#ff4655] p-2" />
            </motion.button>
            <Navigation />
        </header>
    );
}