"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInRight, staggerContainer } from "@/lib/motion/variants";
import { BuddyData } from "@/types/buddies";
import { fetchBuddies } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function Buddies() {
    const { data: allBuddies, loading, error, refetch } = useFetch<BuddyData[]>(fetchBuddies, []);
    const [randomBuddies, setRandomBuddies] = useState<BuddyData[]>([]);
    const ready = useDelay(1000);
    const isLoading = !ready || loading;

    useEffect(() => {
        if (allBuddies && allBuddies.length > 0) {
            const shuffled = [...allBuddies];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setRandomBuddies(shuffled.slice(0, 20));
        }
    }, [allBuddies]);

    if (isLoading) {
        return (
            <div className="container mx-auto my-20 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="w-22 h-22 bg-black/20 shadow-lg overflow-hidden">
                                    <Skeleton variant="rectangular" width={88} height={88} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <Skeleton variant="text" width={250} height={80} />
                        <Skeleton variant="text" width={200} height={30} />
                        <Skeleton variant="text" width="100%" height={80} />
                        <Skeleton variant="rectangular" width={150} height={50} className="mt-4" />
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
        <div className="container mx-auto my-20 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                        {randomBuddies.map((buddy) => (
                            <div key={buddy.uuid} className="relative w-22 h-22 bg-black/20 shadow-lg overflow-hidden">
                                <Image
                                    src={buddy.displayIcon}
                                    alt={buddy.displayName}
                                    fill
                                    unoptimized
                                    loading="eager"
                                    className="object-contain p-4" />
                            </div>
                        ))}
                    </div>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col justify-center">
                    <motion.h3 variants={fadeIn} className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4">
                        BUDDIES
                    </motion.h3>
                    <motion.h4 variants={fadeIn} className="text-md font-bold mb-2">
                        CHARMS FOR YOUR ARSENAL
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        From cute creatures to tactical trinkets, Gun Buddies let you express yourself on every weapon.
                        Collect limited-edition charms from battle passes, events, and agent contracts - each one adds a
                        personal touch to your loadout.
                    </motion.p>
                    <motion.a
                        href="/buddies"
                        variants={slideInRight}
                        className="bg-[#111111] text-white text-lg font-semibold py-4 px-8 shadow-lg w-fit mt-12 hover:bg-[#f1f1f1] hover:text-black cursor-pointer transition-colors duration-300">
                        VIEW ALL BUDDIES
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}