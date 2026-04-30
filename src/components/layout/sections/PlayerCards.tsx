"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInLeft, staggerContainer } from "@/lib/motion/variants";
import { PlayerCardData } from "@/types/playercards";
import { fetchPlayerCards } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function PlayerCards() {
    const { data: allCards, loading, error, refetch } = useFetch<PlayerCardData[]>(fetchPlayerCards, []);
    const [randomCards, setRandomCards] = useState<PlayerCardData[]>([]);
    const ready = useDelay(1000);
    const isLoading = !ready || loading;

    useEffect(() => {
        if (allCards && allCards.length > 0) {
            const shuffled = [...allCards];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setRandomCards(shuffled.slice(0, 4));
        }
    }, [allCards]);

    if (isLoading) {
        return (
            <div className="container mx-auto my-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                    <div className="flex flex-col justify-center gap-2">
                        <Skeleton variant="text" width={300} height={80} />
                        <Skeleton variant="text" width={200} height={30} />
                        <Skeleton variant="text" width="100%" height={80} />
                        <Skeleton variant="rectangular" width={180} height={50} className="mt-4" />
                    </div>
                    <div className="grid grid-flow-col gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="relative h-[50vh] w-full overflow-hidden">
                                <Skeleton variant="rectangular" width="100%" height="100%" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto my-20">
                <div className="flex items-center justify-center gap-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl text-[#ff4655]">{error}</label>
                    <button
                        onClick={refetch}
                        className="bg-[#ff4655] text-white px-4 py-2 rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col justify-center">
                    <motion.h3 variants={fadeIn} className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4">
                        PLAYER CARDS
                    </motion.h3>
                    <motion.h4 variants={fadeIn} className="text-md font-bold mb-2">
                        SHOW YOUR STYLE
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        From agent art to esports team logos, Player Cards let you customize your banner across loading screens, killfeeds, and your career profile.
                        Unlock them through battle passes, events, or direct purchase.
                    </motion.p>
                    <motion.a
                        href="/playercards"
                        variants={slideInLeft}
                        className="bg-[#ff4655] text-white text-lg font-semibold py-4 px-8 shadow-lg w-fit mt-12 hover:bg-[#111111] hover:text-white cursor-pointer transition-colors duration-300">
                        VIEW ALL PLAYER CARDS
                    </motion.a>
                </motion.div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {randomCards.map((card) => (
                        <motion.div
                            key={card.uuid}
                            variants={fadeInUp}
                            className="relative h-[50vh] w-full overflow-hidden">
                            <Image
                                src={card.largeArt}
                                alt={card.displayName}
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