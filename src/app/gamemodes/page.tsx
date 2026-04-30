"use client";

import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion/variants";
import { GameModeData } from "@/types/gamemodes";
import { fetchGameModes } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function GameModesPage() {
    const { data: modes, loading, error, refetch } = useFetch<GameModeData[]>(fetchGameModes, []);
    const ready = useDelay(2000);
    const isLoading = !ready || loading;

    if (isLoading) {
        return (
            <div className="my-10 2xl:my-15">
                <div className="flex flex-col justify-center items-center">
                    <Skeleton variant="text" height={150} className="w-100 md:w-125 lg:w-150 mb-2" />
                    <Skeleton variant="text" width={250} height={30} />
                </div>
                <div className="flex flex-col">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className={`py-10 2xl:py-20 px-8 ${i % 2 === 1 ? "bg-[#111111]/5" : ""}`}>
                            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                                <div className={`relative w-full h-[50vh] overflow-hidden ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                                    <Skeleton variant="rectangular" width="100%" height="100%" />
                                </div>
                                <div className={`flex flex-col gap-2 ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                                    <Skeleton variant="text" width="70%" height={100} />
                                    <Skeleton variant="text" width="100%" height={80} />
                                    <Skeleton variant="text" width="20%" height={30} />
                                </div>
                            </div>
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
                    <label className="text-2xl text-[#ff4655]">{error}</label>
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
                className="flex flex-col justify-center items-center">
                <motion.h3 variants={fadeIn} className="text-5xl lg:text-8xl font-bold mb-2">
                    ALL GAME MODES
                </motion.h3>
                <motion.h4 variants={fadeIn} className="text-md lg:text-lg font-bold">
                    PLAY YOUR WAY
                </motion.h4>
            </motion.div>
            <div className="flex flex-col">
                {modes?.map((mode, index) => (
                    <div key={mode.uuid} className={`py-10 2xl:py-20 px-8 ${index % 2 === 0 ? "" : "bg-[#111111]/5"}`}>
                        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.2 }}
                                className={`relative w-full h-[50vh] overflow-hidden ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                                <div className="absolute inset-0 -z-20">
                                    <Image
                                        src={mode.listViewIconTall}
                                        alt={mode.displayName}
                                        fill
                                        unoptimized
                                        loading="eager"
                                        className="object-cover" />
                                </div>
                                <div className="absolute inset-0 bg-[#111111] opacity-50 -z-10" />
                                <div className="flex items-center justify-center h-full w-full z-10">
                                    <div className="relative h-1/2 w-1/2 overflow-hidden">
                                        <Image
                                            src={mode.displayIcon}
                                            alt={mode.displayName}
                                            fill
                                            unoptimized
                                            loading="eager"
                                            className="object-contain" />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.2 }}
                                className={`flex flex-col gap-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                                <motion.h3 variants={fadeIn} className="text-3xl md:text-5xl font-bold uppercase">
                                    {mode.displayName}
                                </motion.h3>
                                <motion.p variants={fadeInUp} className="text-base md:text-lg">
                                    {mode.description}
                                </motion.p>
                                <motion.span variants={fadeIn} className="text-sm text-gray-400">
                                    Duration: {mode.duration} seconds
                                </motion.span>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}