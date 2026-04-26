"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AgentData } from "@/types/agents";
import { fetchAgents } from "@/lib/api/valorant";
import { useDelay } from "@/hooks/useDelay";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp, slideInRight, staggerContainer } from "@/lib/motion/variants";
import { Skeleton, CircularProgress } from "@mui/material";
import { SiValorant } from "react-icons/si";
import { HiX } from "react-icons/hi";

export default function Agents() {
    const [agents, setAgents] = useState<AgentData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const ready = useDelay(1000);

    useEffect(() => {
        async function loadAgents() {
            setLoading(true);
            try {
                const data = await fetchAgents();
                setAgents(data);
                if (data.length > 0) {
                    setSelectedAgent(data[0]);
                }
                setError(null);
            } catch (err) {
                setError("Unable to load agents. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadAgents();
    }, []);

    const handleSelectAgent = (agent: AgentData) => {
        setIsImageLoading(true);
        setSelectedAgent(agent);
    };

    const handleCloseModal = () => {
        setSelectedAgent(null);
        setIsImageLoading(false);
    };

    const convertRGBA = (hex: string) => {
        const a = parseInt(hex.slice(0, 2), 16) / 255;
        const r = parseInt(hex.slice(2, 4), 16);
        const g = parseInt(hex.slice(4, 6), 16);
        const b = parseInt(hex.slice(6, 8), 16);
        return `rgba(${r},${g},${b},${a})`;
    }

    const gradientColors = selectedAgent?.backgroundGradientColors.map(convertRGBA);
    const gradientCSS = `linear-gradient(135deg, ${gradientColors?.join(", ")})`;

    if (!ready || loading) {
        return (
            <div className="container mx-auto my-10">
                <div className="mb-4">
                    <Skeleton variant="rectangular" width={100} height={42} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden flex flex-col shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                            <Skeleton variant="rectangular" height={128} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto my-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <SiValorant className="h-8 w-8 fill-gray-500" />
                    <label className="text-2xl text-[#ff4655]">{error}</label>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            <motion.h3
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="text-2xl font-bold mb-4">
                AGENTS
            </motion.h3>
            <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {agents.map((agent) => (
                    <div
                        key={agent.uuid}
                        onClick={() => handleSelectAgent(agent)}
                        className="rounded-lg overflow-hidden bg-white flex flex-col shadow-[0px_3px_8px_rgba(0,0,0,0.24)] cursor-pointer hover:shadow-[0px_5px_15px_rgba(0,0,0,0.3)] transition-shadow duration-300">
                        <Image
                            src={agent.displayIcon}
                            alt={agent.displayName}
                            title={`Name: ${agent.displayName}\nRole: ${agent.role.displayName}`}
                            width={400}
                            height={400}
                            className="w-full h-32 object-cover"
                            loading="eager" />
                    </div>
                ))}
            </motion.div>
            <AnimatePresence>
                {selectedAgent && (
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-50"
                        onClick={handleCloseModal}>
                        <div className="relative w-full h-full bg-[#111111] p-6 overflow-hidden shadow-[0px_3px_8px_rgba(0,0,0,0.24)]" >
                            <div className="absolute top-2 right-2 z-10 bg-[#111111]/80 rounded-full p-2 hover:bg-black/90 cursor-pointer transition" onClick={handleCloseModal}>
                                <HiX className="h-4 w-4 fill-white" />
                            </div>
                            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `${gradientCSS}, url(${selectedAgent.background})` }} />
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <div className="relative w-full h-full max-w-5xl max-h-5xl">
                                    {isImageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <CircularProgress size={60} sx={{ color: "#ff4655" }} />
                                        </div>
                                    )}
                                    <Image
                                        src={selectedAgent.fullPortrait}
                                        alt={selectedAgent.displayName}
                                        fill
                                        unoptimized
                                        className="object-contain"
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() => setIsImageLoading(false)}
                                        loading="eager" />
                                </div>
                                {!isImageLoading && (
                                    <div className="flex justify-end w-full">
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="hidden"
                                            animate="visible"
                                            className="grid grid-flow-col gap-4 z-10">
                                            {selectedAgent.abilities.map((ability, idx) => (
                                                <motion.div
                                                    variants={slideInRight}
                                                    key={idx}
                                                    className="relative group select-none"
                                                    onClick={(e) => e.stopPropagation()}>
                                                    <div className="relative h-12 w-12 xl:h-18 xl:w-18 p-4 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 cursor-pointer transition">
                                                        <div className="relative h-6 w-6">
                                                            <Image
                                                                src={ability.displayIcon || selectedAgent.displayIcon}
                                                                alt={ability.displayName}
                                                                fill
                                                                className="object-contain rounded-full"
                                                                unoptimized
                                                                loading="eager" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/90 backdrop-blur rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-20">
                                                        <p className="text-xs font-bold text-white">
                                                            {ability.displayName}
                                                        </p>
                                                        <p className="text-xs text-gray-200 mt-1">
                                                            {ability.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}