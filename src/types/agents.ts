export interface AgentRole {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
}

export interface AgentAbility {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
}

export interface AgentData {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    displayIcon: string;
    fullPortrait: string;
    background: string;
    backgroundGradientColors: string[];
    role: AgentRole;
    abilities: AgentAbility[];
}