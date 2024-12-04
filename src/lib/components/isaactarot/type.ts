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
        selecting: boolean
    }
    data: card,
}

type rune = {
    name: string,
    path: string,
    description: string,
    sprite: {
        x: number,
        y: number
    }
}

type runeData = {
    position: {
        x: number,
        y: number,
        bagX: number,
        bagY: number,
        selecting: boolean
    }
    data: rune,
}

export type {
    card,
    cardData,
    rune,
    runeData
}