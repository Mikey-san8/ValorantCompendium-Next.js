"use client";
import { useEffect, useState } from "react";
import { MapData } from "@/types/maps";
import { fetchMaps } from "@/lib/api/valorant";
import Image from "next/image";
import { SiValorant } from "react-icons/si";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion/variants";

export default function Maps() {
    const [maps, setMaps] = useState<MapData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const [expandedCallouts, setExpandedCallouts] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function loadMaps() {
            try {
                setLoading(true);
                const data = await fetchMaps();
                setMaps(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch maps:", err);
                setError("Unable to load maps. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadMaps();
    }, []);

    const handleShowMoreMaps = () => {
        setVisibleCount(prev => prev + 4);
    };

    const toggleCallouts = (mapUuid: string) => {
        setExpandedCallouts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(mapUuid)) {
                newSet.delete(mapUuid);
            } else {
                newSet.add(mapUuid);
            }
            return newSet;
        });
    };

    const visibleMaps = maps.slice(0, visibleCount);
    const hasMoreMaps = visibleCount < maps.length;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="animate-pulse text-gray-500">Loading maps...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-8">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            <div className="flex items-center gap-4 mb-8">
                <SiValorant className="h-10 w-10 fill-[#ff4655]" />
                <label className="text-4xl font-bold">MAPS</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleMaps.map((map) => {
                    const callouts = map.callouts || [];
                    const isExpanded = expandedCallouts.has(map.uuid);
                    const displayedCallouts = isExpanded ? callouts : callouts.slice(0, 5);
                    const hasMoreCallouts = callouts.length > 5;

                    return (
                        <motion.div
                            key={map.uuid}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg flex flex-col max-h-90">
                            {map.splash && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={map.splash}
                                        alt={map.displayName}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading="eager" />
                                </div>
                            )}
                            <div className="flex flex-col gap-4 p-6">
                                <h2 className="text-xl text-white font-semibold">{map.displayName}</h2>
                                {callouts.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-gray-400">Key callouts:</p>
                                        <div className="flex flex-col gap-2">
                                            <div className="grid grid-cols-5 gap-2">
                                                {displayedCallouts.map((callout, idx) => (
                                                    <span
                                                        key={idx}
                                                        title={`Callout: ${callout.regionName}\nCoordinates: x=${callout.location.x}, y=${callout.location.y}, z=${callout.location.z}`}
                                                        className="text-xs text-white text-center whitespace-nowrap overflow-hidden w-full text-ellipsis min-w-0 box-border bg-[#ff4655] px-2 py-1 rounded-lg select-none cursor-help">
                                                        {callout.regionName}
                                                    </span>
                                                ))}
                                            </div>
                                            {hasMoreCallouts && (
                                                <button
                                                    onClick={() => toggleCallouts(map.uuid)}
                                                    className="text-xs text-white text-center bg-[#212831] p-2 rounded-lg cursor-pointer hover:bg-[#2a3a4a] transition-colors duration-300">
                                                    {isExpanded ? "Show less" : `+${callouts.length - 5} more`}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            {
                hasMoreMaps && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleShowMoreMaps}
                            className="bg-[#ff4655] text-white px-6 py-2 rounded-lg hover:bg-[#e03e4c] transition-colors cursor-pointer">
                            Show More Maps
                        </button>
                    </div>
                )
            }
        </div >
    );
}