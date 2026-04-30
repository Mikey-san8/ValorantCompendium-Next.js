import { GameModeData } from "@/types/gamemodes";
import { PlayerCardData } from "@/types/playercards";
import axios from "axios";

const api = axios.create({
    baseURL: "https://valorant-api.com/v1",
    timeout: 10000,
});

export async function fetchGameModes() {
    const { data } = await api.get("/gamemodes");
    return data.data.filter((mode: GameModeData) =>
        mode.displayIcon && mode.displayIcon.trim() !== "" &&
        mode.description && mode.description.trim() !== ""
    );
}

export async function fetchBuddies() {
    const { data } = await api.get("/buddies");
    return data.data;
}

export async function fetchCurrencies() {
    const { data } = await api.get("/currencies");
    return data.data;
}

export async function fetchPlayerCards() {
    const { data } = await api.get("/playercards");
    return data.data.filter((card: PlayerCardData) =>
        card.largeArt && card.largeArt.trim() !== ""
    );
}

export async function fetchAllData() {
    const [modes] = await Promise.all([
        fetchGameModes()
    ]);
    return { modes };
}