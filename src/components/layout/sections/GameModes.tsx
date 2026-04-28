"use client";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";

import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInLeft, staggerContainer } from "@/lib/motion/variants";

export default function GameModes() {
    const ready = useDelay(2000);

    if (!ready) {
        return (
            <div className="container mx-auto my-20">
                <span>Loading</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20">
            <div className="grid grid-cols-2 gap-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col justify-center">
                    <motion.h3
                        variants={fadeIn}
                        className="text-8xl font-bold mb-4">
                        GAME MODES
                    </motion.h3>
                    <motion.h4
                        variants={fadeIn}
                        className="text-md font-bold mb-2">
                        PLAY YOUR WAY
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        From the intense 5v5 bomb-defusal of Standard and Competitive, to the fast-paced chaos
                        of Spike Rush, Swift Play, Deathmatch, Escalation, and more.
                        Valorant offers a mode for every mood and skill level.
                    </motion.p>
                    <motion.a variants={slideInLeft} className="bg-[#ff4655] text-white text-lg font-semibold py-4 px-8 shadow-lg w-fit mt-12 hover:bg-[#111111] hover:text-white cursor-pointer transition-colors duration-300">
                        VIEW ALL MODES
                    </motion.a>
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="relative h-[55vh]">
                    <Image
                        src="https://cdna.artstation.com/p/assets/images/images/068/578/656/4k/envar-studio-valorant-vignette-1.jpg?1698164428"
                        alt="Envar Studio"
                        fill
                        unoptimized
                        loading="eager"
                        title="Art by Envar Studio"
                        className="object-cover" />
                    <div className="absolute -bottom-5 right-0 text-xs">Art by <a href="https://www.artstation.com/envar" target="_blank" rel="noopener noreferrer">Envar Studio</a></div>
                </motion.div>
            </div>
        </div >
    );
}