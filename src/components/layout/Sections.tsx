import Maps from "./Maps";

export default function Sections() {
    return (
        <div className="flex flex-col overflow-x-hidden w-full">
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
                    style={{ backgroundImage: "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Y1cHQyOWg4ZnQ3aWg3cDhjZ3RkbmdobmxkOWFpOXJ5Z25rZmc2cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NV7L0jzW2iQDuWZtrv/giphy.gif')" }}></div>
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <div className="relative z-20 mx-6 flex flex-col items-center gap-10">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Valorant_logo.svg"
                        alt="valorant"
                        className="w-4xl h-auto object-contain invert" />
                    <span className="text-gray-200 text-lg">A comprehensive compendium for Valorant, featuring detailed information about maps, agents, weapons, and more.</span>
                    <div className="border border-gray-50 overflow-hidden">
                        <a
                            href="https://playvalorant.com/en-gb/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#ff4655] py-5 px-8 m-0.5 text-white">
                            OFFICIAL WEBSITE
                        </a>
                    </div>
                </div>
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