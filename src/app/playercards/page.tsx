"use client";

import { useState } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion/variants";
import { PlayerCardData } from "@/types/playercards";
import { fetchPlayerCards } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function PlayerCardsPage() {
    const { data: cards, loading, error, refetch } = useFetch<PlayerCardData[]>(fetchPlayerCards, []);
    const ready = useDelay(2000);
    const isLoading = !ready || loading;
    const [visibleCount, setVisibleCount] = useState(12);
    const visibleCards = cards?.slice(0, visibleCount) || [];
    const hasMore = cards ? visibleCount < cards.length : false;

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    if (isLoading) {
        return (
            <div className="my-10 2xl:my-15">
                <div className="flex flex-col justify-center items-center mb-8">
                    <Skeleton variant="text" height={150} className="w-100 md:w-125 lg:w-150 mb-2" />
                    <Skeleton variant="text" width={250} height={30} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-8 3xl:px-0 container mx-auto">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="relative w-full h-[50vh] overflow-hidden">
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto my-10 2xl:my-15">
                <div className="flex items-center justify-center gap-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl">{error}</label>
                    <button onClick={refetch} className="bg-[#ff4655] text-white px-4 py-2 rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="my-10 2xl:my-20">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="flex flex-col justify-center items-center mb-8">
                <motion.h3 variants={fadeIn} className="text-5xl lg:text-8xl font-bold mb-2">
                    ALL PLAYER CARDS
                </motion.h3>
                <motion.h4 variants={fadeIn} className="text-md lg:text-lg font-bold">
                    SHOW YOUR STYLE
                </motion.h4>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-8 3xl:px-0 container mx-auto">
                {visibleCards.map((card) => (
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        key={card.uuid}
                        className="flex flex-col gap-2">
                        <div className="relative w-full h-[50vh] overflow-hidden">
                            <Image
                                src={card.largeArt}
                                alt={card.displayName}
                                fill
                                unoptimized
                                loading="eager"
                                className="object-cover" />
                        </div>
                        <div className="relative w-full h-16">
                            <Image
                                src={card.wideArt}
                                alt={card.displayName}
                                fill
                                unoptimized
                                loading="eager"
                                className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-80" />
                            <label className="absolute inset-0 flex items-center justify-center text-sm text-white font-semibold">
                                {card.displayName}
                            </label>
                        </div>
                    </motion.div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleShowMore}
                        className="bg-[#ff4655] text-white px-6 py-2 hover:bg-[#111111] transition-colors cursor-pointer">
                        Show More Cards
                    </button>
                </div>
            )}
        </div>
    );
} 