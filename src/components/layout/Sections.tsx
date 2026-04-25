import Maps from "./Maps";
import Hero from "./Hero";

export default function Sections() {
    return (
        <div className="flex flex-col overflow-x-hidden w-full">
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <Hero />
            </section>
            <section id="maps" className="p-8 scroll-mt-20 bg-[#1a1a1a]/5">
                <Maps />
            </section>
            <section id="agents" className="min-h-screen p-8 scroll-mt-20">
                <h2 className="text-3xl font-bold mb-4">Agents</h2>
                <p className="text-gray-700">Discover the unique abilities and lore of each agent.</p>
            </section>
            <section id="weapons" className="min-h-screen p-8 scroll-mt-20">
                <h2 className="text-3xl font-bold mb-4">Weapons</h2>
                <p className="text-gray-700">Get stats, skins, and tips for all the weapons in the game.</p>
            </section>
        </div>
    );
}