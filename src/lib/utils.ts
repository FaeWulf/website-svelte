// place files you want to import through the `$lib` alias in this folder.

export function typewriter(node: Node, { delay = 0, speed = 1 }: any) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent || "";
    const duration = text.length / (speed * 0.01);

    return {
        delay,
        duration,
        tick: (t: number) => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        }
    };
}

export function gibberish(node: Node, { delay = 0, speed = 1 }: any) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent || "";
    const duration = text.length / (speed * 0.01);
    let ticks = 0
    const temp = 7

    return {
        delay,
        duration,
        tick: (t: number) => {
            const i = Math.trunc(text.length * t);
            if (t < 1) {
                if (ticks == 0)
                    node.textContent = randomString(text.slice(0, i).length)
            }
            else
                node.textContent = text

            ticks++;
            ticks %= temp
        }
    };
}

function randomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%$^&*()';
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter++;
    }
    return result;
}