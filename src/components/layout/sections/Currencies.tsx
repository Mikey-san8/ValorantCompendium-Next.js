"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInRight, staggerContainer } from "@/lib/motion/variants";
import { CurrencyData } from "@/types/currencies";
import { fetchCurrencies } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function Currencies() {
    const { data: currencies, loading, error, refetch } = useFetch<CurrencyData[]>(fetchCurrencies, []);
    const ready = useDelay(1000);
    const isLoading = !ready || loading;

    if (isLoading) {
        return (
            <div className="container mx-auto my-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 text-white">
                    <div className="flex items-center justify-center">
                        <div className="grid grid-flow-col gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="relative h-32 w-32 overflow-hidden">
                                    <Skeleton variant="rectangular" width={128} height={128} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <Skeleton variant="text" width={300} height={80} />
                        <Skeleton variant="text" width={250} height={30} />
                        <Skeleton variant="text" width="100%" height={100} />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 text-white">
                <div className="flex items-center justify-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        className="grid grid-flow-col gap-6">
                        {currencies?.map((currency) => (
                            <motion.div
                                variants={fadeInUp}
                                key={currency.uuid}
                                className="relative h-22 w-22 lg:h-32 lg:w-32 overflow-hidden">
                                <Image
                                    src={currency.displayIcon}
                                    alt={currency.displayName}
                                    title={currency.displayName}
                                    fill
                                    unoptimized
                                    loading="eager"
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col justify-center">
                    <motion.h3 variants={fadeIn} className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4">
                        CURRENCIES
                    </motion.h3>
                    <motion.h4 variants={fadeIn} className="text-md font-bold mb-2">
                        POWER UP YOUR COLLECTION
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        Valorant Points (VP) unlock new agents, skins, and battle passes.
                        Radianite Points (RP) upgrade your weapon skins with variants, animations, and finishers.
                        Kingdom Credits earn free tier items through daily play.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}