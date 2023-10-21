type card = {
    name: string,
    path: string,
    header: string,
    punchline: string,
    advice: string,
    sprite: {
        x: number,
        y: number
    }
}

type cardData = {
    position: {
        x: number,
        y: number,
        deckX: number,
        deckY: number,
        glow: boolean,
        facing: boolean,
    }
    data: card,
}

export type {
    card,
    cardData
}