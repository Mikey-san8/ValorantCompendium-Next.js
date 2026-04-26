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
    const [visibleAgentsCount, setVisibleAgentsCount] = useState(8);
    const ready = useDelay(2000);

    useEffect(() => {
        async function loadAgents() {
            setLoading(true);
            try {
                const data = await fetchAgents();
                setAgents(data);
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

    const handleShowMoreAgents = () => {
        setVisibleAgentsCount(prev => prev + 8);
    };

    const visibleAgents = agents.slice(0, visibleAgentsCount);
    const hasMoreAgents = visibleAgentsCount < agents.length;

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
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden flex flex-col shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                            <Skeleton variant="rectangular" height={128} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Skeleton width={140} height={32} variant="rounded" />
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
            <AnimatePresence mode="wait">
                {selectedAgent === null ? (
                    <motion.div
                        key="grid"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {visibleAgents.map((agent) => (
                            <motion.div
                                layoutId={agent.uuid}
                                key={agent.uuid}
                                onClick={() => handleSelectAgent(agent)}
                                className="relative w-full h-32 rounded-lg overflow-hidden bg-white flex flex-col shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                                <Image
                                    src={agent.displayIcon}
                                    alt={agent.displayName}
                                    title={`Name: ${agent.displayName}\nRole: ${agent.role.displayName}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    loading="eager" />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        layoutId={selectedAgent.uuid}
                        key="detail"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-full flex flex-col gap-2">
                        <div className="relative w-full h-full bg-[#111111] overflow-hidden shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-lg ">
                            <button onClick={handleCloseModal} className="absolute top-4 right-4 z-20 bg-black/60 rounded-full p-2 hover:bg-black/90 transition-colors cursor-pointer">
                                <HiX className="h-5 w-5 text-white" />
                            </button>
                            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `${gradientCSS}, url(${selectedAgent.background})` }} />
                            <div className="relative z-10 h-[70vh] select-none">
                                {!isImageLoading && (
                                    <div className="absolute top-4 left-4 rounded-lg overflow-hidden bg-white shadow-md w-12 h-12 md:w-16 md:h-16">
                                        <Image
                                            src={selectedAgent.displayIcon}
                                            alt={selectedAgent.displayName}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            priority
                                            loading="eager" />
                                    </div>
                                )}
                                <div className="relative w-full h-full">
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
                                        priority
                                        className={`object-contain transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() => setIsImageLoading(false)} />
                                </div>
                                {!isImageLoading && (
                                    <div className="absolute bottom-4 right-4 max-w-md flex flex-col gap-4 z-20">
                                        <div className="hidden xl:flex flex-col gap-1 p-6 bg-[#111111]/80 rounded-lg shadow-lg text-white">
                                            <div className="absolute top-6 right-6">
                                                <div className="relative h-12 w-12">
                                                    <Image
                                                        src={selectedAgent.displayIcon}
                                                        alt={selectedAgent.displayName}
                                                        fill
                                                        className="object-contain rounded-full"
                                                        unoptimized
                                                        loading="eager" />
                                                </div>
                                            </div>
                                            <h4 className="text-sm">Agent Name</h4>
                                            <span className="text-lg font-semibold">{selectedAgent.displayName}</span>
                                            <h4 className="text-sm">Developer Name</h4>
                                            <span className="text-lg font-semibold">{selectedAgent.developerName}</span>
                                            <div className="bg-gray-500 h-0.5 w-full my-2" />
                                            <p className="text-lg">{selectedAgent.description}</p>
                                        </div>
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="hidden"
                                            animate="visible"
                                            className="grid grid-flow-row md:grid-flow-col gap-4 z-10">
                                            {selectedAgent.abilities.map((ability, idx) => (
                                                <motion.div
                                                    variants={slideInRight}
                                                    key={idx}
                                                    className="relative group select-none"
                                                    onClick={(e) => e.stopPropagation()}>
                                                    <div className="relative h-12 w-12 xl:h-full xl:w-full p-4 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 cursor-pointer transition">
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
                        <div className="flex xl:hidden flex-col gap-1 mt-2">
                            <h4 className="text-sm">Agent Name</h4>
                            <span className="text-lg font-semibold">{selectedAgent.displayName}</span>
                            <h4 className="text-sm">Developer Name</h4>
                            <span className="text-lg font-semibold">{selectedAgent.developerName}</span>
                            <div className="bg-gray-500 h-0.5 w-full my-2" />
                            <p className="text-lg">{selectedAgent.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {hasMoreAgents && selectedAgent === null && (
                <div className="mx-auto mt-12 w-fit border border-black overflow-hidden">
                    <button
                        onClick={handleShowMoreAgents}
                        className="bg-[#ff4655] text-white px-6 py-2 m-0.5 hover:bg-[#e03e4c] transition-colors cursor-pointer">
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}