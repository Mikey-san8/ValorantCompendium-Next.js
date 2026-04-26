"use client";

import { fadeIn, fadeInUp, scaleUp, staggerContainer } from "@/lib/motion/variants";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="container mx-auto">
            <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Y1cHQyOWg4ZnQ3aWg3cDhjZ3RkbmdobmxkOWFpOXJ5Z25rZmc2cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV7L0jzW2iQDuWZtrv/giphy.gif')" }}>
            </div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="relative z-20 mx-6 flex flex-col items-center gap-10">
                <motion.img variants={scaleUp}
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Valorant_logo.svg"
                    alt="valorant"
                    className="w-4xl h-auto object-contain invert" />
                <motion.span variants={fadeIn} className="text-gray-200 text-center text-sm md:text-md lg:text-lg"><strong className="text-[#ff4655] text-sm border p-1 mr-1">VALCORE</strong> A comprehensive compendium for Valorant, featuring detailed information about maps, agents, weapons, and more.</motion.span>
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