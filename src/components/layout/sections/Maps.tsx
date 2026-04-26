"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapData } from "@/types/maps";
import { fetchMaps } from "@/lib/api/valorant";
import { SiValorant } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/motion/variants";
import { Skeleton } from "@mui/material";
import { useDelay } from "@/hooks/useDelay";

export default function Maps() {
    const [maps, setMaps] = useState<MapData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const [expandedCallouts, setExpandedCallouts] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const ready = useDelay(2000);

    useEffect(() => {
        async function loadMaps() {
            setLoading(true);
            try {
                const data = await fetchMaps();
                setMaps(data);
                setError(null);
            } catch (err) {
                setError("Unable to load maps. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadMaps();
    }, []);

    const handleShowMoreMaps = () => {
        setVisibleCount(vc => vc + 4);
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

    if (!ready || loading) {
        return (
            <div className="container mx-auto my-10">
                <div className="mb-4">
                    <Skeleton variant="rectangular" width={100} height={42} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden flex flex-col max-h-90 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                            <div className="relative h-48 w-full">
                                <Skeleton height="100%" variant="rectangular" />
                            </div>
                            <div className="flex flex-col gap-4 p-6">
                                <Skeleton width="30%" height={40} />
                                <div className="flex flex-col gap-2">
                                    <Skeleton width={80} height={16} />
                                    <div className="grid grid-cols-5 gap-2">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <Skeleton key={j} height={20} variant="rounded" />
                                        ))}
                                    </div>
                                    <Skeleton width="100%" height={32} />
                                </div>
                            </div>
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
                className="text-2xl font-bold mb-4">MAPS</motion.h3>
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
                            className="bg-white/80 rounded-lg overflow-hidden flex flex-col max-h-90 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
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
                                <h2 className="text-xl font-semibold">{map.displayName}</h2>
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
            {hasMoreMaps && (
                <div className="mx-auto mt-12 w-fit border border-black overflow-hidden">
                    <button
                        onClick={handleShowMoreMaps}
                        className="bg-[#ff4655] text-white px-6 py-2 m-0.5 hover:bg-[#e03e4c] transition-colors cursor-pointer">
                        Show More
                    </button>
                </div>
            )}
        </div >
    );
}