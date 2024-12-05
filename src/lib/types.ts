interface track {
    title: string;
    time: string;
    ID: string;
    url: string;
    artist: string;
    fav: number;
}

interface badgeInfo {
    value: number;
    text: string;
    learner: boolean;
    time?: number;
    favorite?: boolean;
}

export type { track, badgeInfo };