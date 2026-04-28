"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";

import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInRight, staggerContainer } from "@/lib/motion/variants";
import { BuddyData } from "@/types/buddies";
import { fetchBuddies } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";

export default function Buddies() {
    const [buddy, setBuddies] = useState<BuddyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const ready = useDelay(1000);

    useEffect(() => {
        async function loadBuddies() {
            setLoading(true);
            try {
                const data = await fetchBuddies();
                const shuffled = [...data];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setBuddies(shuffled.slice(0, 20));
                setError(null);
            } catch (err) {
                setError("Unable to load buddies. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadBuddies();
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
                <div className="flex items-center justify-center gap-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl text-[#ff4655]">{error}</label>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20 text-white">
            <div className="grid grid-cols-2 gap-20">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-4">
                        {buddy.map((b) => (
                            <div key={b.uuid} className="relative w-22 h-22 rounded-lg shadow-lg overflow-hidden">
                                <Image
                                    src={b.displayIcon}
                                    alt={b.displayName}
                                    fill
                                    unoptimized
                                    loading="eager"
                                    className="object-cover" />
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
                    <motion.h3
                        variants={fadeIn}
                        className="text-8xl font-bold mb-4">
                        BUDDIES
                    </motion.h3>
                    <motion.h4
                        variants={fadeIn}
                        className="text-md font-bold mb-2">
                        CHARMS FOR YOUR ARSENALS
                    </motion.h4>
                    <motion.p variants={fadeInUp} className="text-md">
                        From cute creatures to tactical trinkets, Gun Buddies let you express yourself on every weapon.
                        Collect limited-edition charms from battle passes, events, and agent contracts - each one adds a
                        personal touch to your loadout.
                    </motion.p>
                    <motion.a href="/buddies" variants={slideInRight} className="bg-[#111111] text-white text-lg font-semibold py-4 px-8 shadow-lg w-fit mt-12 hover:bg-[#f1f1f1] hover:text-black cursor-pointer transition-colors duration-300">
                        VIEW ALL BUDDIES
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}