export interface CalloutLocation {
    x: number;
    y: number;
    z: number;
}

export interface Callout {
    regionName: string;
    location: CalloutLocation;
}

export interface MapData {
    uuid: string;
    displayName: string;
    displayIcon: string;
    listViewIconTall: string;
    splash: string;
    callouts: Callout[];
}