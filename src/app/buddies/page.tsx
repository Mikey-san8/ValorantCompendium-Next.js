"use client";

import Image from "next/image";
import { useState } from "react";
import { useDelay } from "@/hooks/useDelay";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion/variants";
import { fetchBuddies } from "@/lib/api/valorant";
import { BuddyData } from "@/types/buddies";
import { SiValorant } from "react-icons/si";
import { Skeleton } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";
import { HiX, HiOutlineSearch } from "react-icons/hi";

export default function BuddiesPage() {
    const { data: buddies, loading, error, refetch } = useFetch<BuddyData[]>(fetchBuddies, []);
    const ready = useDelay(2000);
    const isLoading = !ready || loading;
    const [visibleCount, setVisibleCount] = useState(24);
    const [selectedBuddy, setSelectedBuddy] = useState<BuddyData | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBuddies = buddies?.filter((buddy) =>
        buddy.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const visibleBuddies = filteredBuddies.slice(0, visibleCount);
    const hasMore = visibleCount < filteredBuddies.length;

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 24);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setVisibleCount(24);
    };

    if (isLoading) {
        return (
            <div className="my-10 2xl:my-15">
                <div className="flex flex-col justify-center items-center mb-8">
                    <Skeleton variant="text" height={150} className="w-100 md:w-125 lg:w-150 mb-2" />
                    <Skeleton variant="text" width={250} height={30} />
                </div>
                <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 px-8 3xl:px-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center justify-center gap-4 overflow-hidden bg-[#111111]/5 p-4">
                            <Skeleton variant="circular" width={64} height={64} />
                            <Skeleton variant="text" width={100} height={24} />
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
        <>
            <div className="my-10 2xl:my-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col justify-center items-center mb-8">
                    <motion.h3 variants={fadeIn} className="text-5xl lg:text-8xl font-bold mb-2">
                        ALL BUDDIES
                    </motion.h3>
                    <motion.h4 variants={fadeIn} className="text-md lg:text-lg font-bold">
                        CHARMS FOR YOUR ARSENAL
                    </motion.h4>
                </motion.div>

                <div className="container mx-auto mb-8 flex justify-end px-8 3xl:px-0">
                    <div className="relative w-64">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search buddies"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 shadow-2xl border border-[#111111]/5 bg-[#111111]/5 outline-none" />
                    </div>
                </div>

                <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 px-8 3xl:px-0">
                    {visibleBuddies.map((buddy) => (
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            key={buddy.uuid}
                            onClick={() => setSelectedBuddy(buddy)}
                            className="flex flex-col items-center justify-center gap-4 overflow-hidden bg-[#111111]/5 p-4 cursor-pointer hover:scale-105 transition-transform duration-200">
                            <div className="relative h-24 w-24 overflow-hidden">
                                <Image
                                    src={buddy.displayIcon}
                                    alt={buddy.displayName}
                                    fill
                                    unoptimized
                                    loading="eager"
                                    className="object-contain" />
                            </div>
                            <label className="w-full text-sm text-center font-semibold mt-auto truncate">
                                {buddy.displayName}
                            </label>
                        </motion.div>
                    ))}
                </div>

                {hasMore && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#ff4655] text-white px-6 py-2 hover:bg-[#111111] transition-colors cursor-pointer">
                            Show More Buddies
                        </button>
                    </div>
                )}

                {filteredBuddies.length === 0 && searchQuery && (
                    <p className="text-center text-gray-400 mt-12">
                        No buddies match "{searchQuery}".
                    </p>
                )}
            </div>

            <AnimatePresence>
                {selectedBuddy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 p-4"
                        onClick={() => setSelectedBuddy(null)}>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative bg-[#111111]/20 p-8 shadow-2xl min-w-sm rounded-lg"
                            onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedBuddy(null)} className="absolute top-2 right-2 text-white bg-[#111111]/50 rounded-full p-1 hover:bg-[#ff4655] transition">
                                <HiX className="h-5 w-5" />
                            </button>
                            <div className="flex flex-col items-center gap-8">
                                <motion.div
                                    className="relative h-40 w-40"
                                    animate={{ rotateY: [-25, 25] }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    }}>
                                    <Image
                                        src={selectedBuddy.displayIcon}
                                        alt={selectedBuddy.displayName}
                                        fill
                                        className="object-contain"
                                        unoptimized />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white text-center">{selectedBuddy.displayName}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}