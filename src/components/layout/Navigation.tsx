"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";
import { motion, AnimatePresence } from "framer-motion";
import { slideInRight, staggerContainer } from "@/lib/motion/variants";
import { HiMenu, HiX } from "react-icons/hi";
import { DiOpensource } from "react-icons/di";
import { SiValorant } from "react-icons/si";

type SectionId = "home" | "maps" | "agents" | "weapons";

export default function Navigation() {
    const lenis = useLenis();
    const [activeSection, setActiveSection] = useState<SectionId>("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMenu = () => setMobileMenuOpen(false);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                let bestEntry: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                            bestEntry = entry;
                        }
                    }
                }
                if (bestEntry) {
                    const id = bestEntry.target.id as SectionId;
                    setActiveSection(id);
                }
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => observer.observe(section));

        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (targetId: string) => {
        if (targetId === "#") {
            lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
        } else {
            lenis?.scrollTo(targetId, { offset: 0, duration: 1.2 });
        }
        closeMenu();
    };

    const getButtonClass = (section: SectionId) => {
        const base = "cursor-pointer text-white px-4 py-2 rounded-lg";
        const activeClass = "active animated-underline";
        const inactiveClass = "animated-underline";
        return `${base} ${activeSection === section ? activeClass : inactiveClass}`;
    };

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="hidden md:flex items-center justify-center gap-8">
                <motion.button
                    variants={slideInRight}
                    onClick={() => handleScroll("#")}
                    className={getButtonClass("home")}>
                    Home
                </motion.button>
                <motion.button
                    variants={slideInRight}
                    onClick={() => handleScroll("#maps")}
                    className={getButtonClass("maps")}>
                    Maps
                </motion.button>
                <motion.button
                    variants={slideInRight}
                    onClick={() => handleScroll("#agents")}
                    className={getButtonClass("agents")}>
                    Agents
                </motion.button>
                <motion.button
                    variants={slideInRight}
                    onClick={() => handleScroll("#weapons")}
                    className={getButtonClass("weapons")}>
                    Weapons
                </motion.button>
                <motion.a href="https://dash.valorant-api.com/" target="_blank" rel="noopener noreferrer" variants={slideInRight} className="cursor-pointer">
                    <DiOpensource className="h-10 w-10 fill-white" />
                </motion.a>
            </motion.nav>

            <div className="block md:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex items-center cursor-pointer"
                    aria-label="Menu">
                    {mobileMenuOpen ? <HiX className="h-8 w-8 fill-white" /> : <HiMenu className="h-8 w-8 fill-white" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-18 right-2 bg-[#111111] rounded-lg z-50 md:hidden shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                        <div className="flex flex-col gap-6 p-6">
                            <div className="flex items-center justify-center">
                                <SiValorant className="h-8 w-8 fill-[#ff4655]" />
                            </div>
                            <button
                                onClick={() => handleScroll("#")}
                                className="text-white text-center">
                                Home
                            </button>
                            <button
                                onClick={() => handleScroll("#maps")}
                                className="text-white text-center">
                                Maps
                            </button>
                            <button
                                onClick={() => handleScroll("#agents")}
                                className="text-white text-center">
                                Agents
                            </button>
                            <button
                                onClick={() => handleScroll("#weapons")}
                                className="text-white text-center">
                                Weapons
                            </button>
                            <a href="https://dash.valorant-api.com/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white rounded-lg py-1 cursor-pointer shadow-[0px_3px_8px_rgba(0,0,0,0.24)] w-28">
                                <DiOpensource className="h-6 w-6" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}