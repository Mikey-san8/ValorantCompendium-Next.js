"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";

import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInLeft, staggerContainer } from "@/lib/motion/variants";
import { PlayerCardData } from "@/types/playercards";
import { fetchPlayerCards } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";

export default function PlayerCards() {
    const [playerCard, setPlayerCards] = useState<PlayerCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const ready = useDelay(2000);

    useEffect(() => {
        async function loadCurrencies() {
            setLoading(true);
            try {
                const data = await fetchPlayerCards();
                const shuffled = [...data];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setPlayerCards(shuffled.slice(0, 4));
                setError(null);
            } catch (err) {
                setError("Unable to load player cards. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadCurrencies();
    }, []);

    if (!ready || loading) {
        return (
            <div className="container mx-auto my-20">
                <span>Loading</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto my-20">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl text-[#ff4655]">{error}</label>
                </div>
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
                        PLAYER CARDS
                    </motion.h3>
                    <motion.h4
                        variants={fadeIn}
                        className="text-md font-bold mb-2">
                        SHOW YOUR STYLE
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        From agent art to esports team logos, Player Cards let you customize your banner across loading screens, killfeeds, and your career profile.
                        Unlock them through battle passes, events, or direct purchase.
                    </motion.p>
                    <motion.a variants={slideInLeft} className="bg-[#ff4655] text-white text-lg font-semibold py-4 px-8 shadow-lg w-fit mt-12 hover:bg-[#111111] hover:text-white cursor-pointer transition-colors duration-300">
                        VIEW ALL PLAYER CARDS
                    </motion.a>
                </motion.div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-flow-col gap-4">
                    {playerCard.map((pc) => (
                        <motion.div key={pc.uuid} variants={fadeInUp} className="relative h-[50vh] w-full overflow-hidden">
                            <Image
                                src={pc.largeArt}
                                alt={pc.displayName}
                                fill
                                unoptimized
                                loading="eager"
                                className="object-fill" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}