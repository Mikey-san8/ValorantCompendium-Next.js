"use client";

import Image from "next/image";
import { fadeIn, fadeInUp, scaleUp, staggerContainer } from "@/lib/motion/variants";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="container mx-auto">
            <div className="absolute inset-0 w-full h-full -z-20">
                <Image
                    src="https://cdna.artstation.com/p/assets/images/images/025/414/400/4k/suke-cb-key-art-327-final1.jpg?1585719646"
                    alt="hero-background"
                    fill
                    unoptimized
                    loading="eager"
                    className="object-cover" />
            </div>
            <div className="absolute inset-0 w-full h-full -z-10 bg-[#111111] opacity-50" />
            <div className="absolute bottom-2 right-2 text-xs text-white">Art by <a href="https://www.artstation.com/sukeart" target="_blank" rel="noopener noreferrer">Su Ke</a></div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="relative z-20 mx-6 flex flex-col items-center gap-10">
                <motion.img
                    variants={scaleUp}
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Valorant_logo.svg"
                    alt="valorant"
                    className="w-4xl h-auto object-contain invert" />
                <motion.span variants={fadeIn} className="text-gray-200 text-center text-sm md:text-md lg:text-lg"><strong className="text-[#ff4655] text-sm border p-1 mr-1">VALCORE</strong> A compendium website for Valorant, featuring detailed information about game modes, buddies, player cards, and more.</motion.span>
                <motion.div variants={fadeInUp} className="border border-gray-50 overflow-hidden">
                    <a
                        href="https://playvalorant.com/en-gb/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[#ff4655] py-5 px-8 m-0.5 text-white">
                        OFFICIAL WEBSITE
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}