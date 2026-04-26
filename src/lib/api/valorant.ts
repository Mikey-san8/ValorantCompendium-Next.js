import axios from "axios";

const api = axios.create({
    baseURL: "https://valorant-api.com/v1",
    timeout: 10000,
});

export async function fetchMaps() {
    const { data } = await api.get("/maps");
    return data.data.filter((map: any) => map.uuid !== "Therm" && map.displayicon !== null && map.callouts !== null);
}

export async function fetchAgents() {
    const { data } = await api.get("/agents");
    return data.data.filter((agent: any) => agent.isPlayableCharacter === true);
}

export async function fetchWeapons() {
    const { data } = await api.get("/weapons");
    return data.data;
}

export async function fetchAllData() {
    const [agents, maps, weapons] = await Promise.all([
        fetchAgents(),
        fetchMaps(),
        fetchWeapons(),
    ]);
    return { agents, maps, weapons };
}