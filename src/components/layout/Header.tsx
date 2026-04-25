"use client";

import { motion } from "framer-motion";
import { slideInLeft } from "@/lib/motion/variants";
import { useLenis } from "@/components/layout/SmoothScroll";

import { SiValorant } from "react-icons/si";

import Navigation from "./Navigation";

export default function Header() {
    const lenis = useLenis();

    return (
        <header className="fixed top-0 w-full flex items-center justify-between px-5 py-4 z-50 bg-[#111111] backdrop-blur-md shadow-[0_2px_4px_rgba(0,0,0,0.4),0_7px_13px_-3px_rgba(0,0,0,0.3),0_-3px_0px_inset_rgba(0,0,0,0.2)]">
            <motion.button onClick={() => lenis?.scrollTo(0, { offset: 0, duration: 1.2 })}
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="cursor-pointer">
                <SiValorant className="h-8 w-8 fill-white" />
            </motion.button>
            <Navigation />
        </header>
    );
}