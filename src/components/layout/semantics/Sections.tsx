import Hero from "../sections/Hero";
import GameModes from "../sections/GameModes";
import Buddies from "../sections/Buddies";
import PlayerCards from "../sections/PlayerCards";
import Currencies from "../sections/Currencies";

export default function Sections() {
    return (
        <div className="flex flex-col overflow-x-hidden w-full">
            <section id="home" className="relative h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden">
                <Hero />
            </section>
            <section id="gamemodes" className="px-8 md:py-8 scroll-mt-20 bg-[#1a1a1a]/5">
                <GameModes />
            </section>
            <section id="buddies" className="px-8 md:py-8 scroll-mt-20 bg-[#1a1a1a]">
                <Buddies />
            </section>
            <section id="playercards" className="px-8 md:py-8 scroll-mt-20 bg-[#1a1a1a]/5">
                <PlayerCards />
            </section>
            <section id="currencies" className="px-8 md:py-8 scroll-mt-20 bg-[#ff4655]">
                <Currencies />
            </section>
        </div>
    );
}