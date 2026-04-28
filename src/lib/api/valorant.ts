import axios from "axios";

const api = axios.create({
    baseURL: "https://valorant-api.com/v1",
    timeout: 10000,
});

export async function fetchGameModes() {
    const { data } = await api.get("/gamemodes");
    return data.data;
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
    return data.data;
}

export async function fetchAllData() {
    const [modes] = await Promise.all([
        fetchGameModes()
    ]);
    return { modes };
}