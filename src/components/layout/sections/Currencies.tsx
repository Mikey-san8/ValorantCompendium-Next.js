"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDelay } from "@/hooks/useDelay";

import { motion } from "framer-motion";
import { fadeIn, fadeInUp, slideInRight, staggerContainer } from "@/lib/motion/variants";
import { CurrencyData } from "@/types/currencies";
import { fetchCurrencies } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";

export default function Currencies() {
    const [currency, setCurrencies] = useState<CurrencyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const ready = useDelay(1000);

    useEffect(() => {
        async function loadCurrencies() {
            setLoading(true);
            try {
                const data = await fetchCurrencies();
                setCurrencies(data);
                setError(null);
            } catch (err) {
                setError("Unable to load currencies. Please try again later.");
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
                <div className="flex items-center justify-center gap-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl text-[#ff4655]">{error}</label>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20">
            <div className="grid grid-cols-2 gap-20 text-white">
                <div className="flex items-center justify-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        className="grid grid-flow-col gap-6">
                        {currency.map((c) => (
                            <motion.div variants={fadeInUp} key={c.uuid} className="relative h-32 w-32 overflow-hidden">
                                <Image
                                    src={c.displayIcon}
                                    alt={c.displayName}
                                    title={c.displayName}
                                    fill
                                    unoptimized
                                    loading="eager"
                                    className="object-cover" />
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
                    <motion.h3
                        variants={fadeIn}
                        className="text-8xl font-bold mb-4">
                        CURRENCIES
                    </motion.h3>
                    <motion.h4
                        variants={fadeIn}
                        className="text-md font-bold mb-2">
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