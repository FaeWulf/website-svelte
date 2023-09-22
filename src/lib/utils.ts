import tippy from "tippy.js";
// place files you want to import through the `$lib` alias in this folder.
function typewriter(node: Node, { delay = 0, speed = 1 }: any) {
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

function gibberish(node: Node, { delay = 0, speed = 1 }: any) {
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


// ultis funtion
function tooltip(node: HTMLElement, params: any = {}) {
    // Determine the title to show. We want to prefer
    //    the custom content passed in first, then the
    // HTML title attribute then the aria-label
    // in that order.
    const custom = params.content;
    const title = node.title;
    const label = node.getAttribute("aria-label");
    const content = custom || title || label;

    // Let's make sure the "aria-label" attribute
    // is set so our element is accessible:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
    if (!label) node.setAttribute("aria-label", content);

    // Clear out the HTML title attribute since
    // we don't want the default behavior of it
    // showing up on hover.
    node.title = "";

    // Support any of the Tippy props by forwarding all "params":
    // https://atomiks.github.io/tippyjs/v6/all-props/
    const tip = tippy(node, { content, ...params });

    if (params.instancesHolder)
        params.instancesHolder.push(tip)

    return {
        // If the props change, let's update the Tippy instance:
        update: (newParams: any) => tip.setProps({ content, ...newParams }),

        // Clean up the Tippy instance on unmount:
        destroy: () => tip.destroy(),
    };
};

function capitalFirstLeter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}


//Fisher-Yates (Knuth) Shuffle Algorithm
function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const asyncIntervals: any[] = [];

const runAsyncInterval = async (cb: () => any, interval: number | undefined, intervalIndex: number) => {
    await cb();
    if (asyncIntervals[intervalIndex].run) {
        asyncIntervals[intervalIndex].id = setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval)
    }
};

/**
 * Sets an asynchronous interval that repeatedly calls a callback function at a specified interval.
 *
 * @param {() => any} cb - The callback function to be called at the specified interval.
 * @param {number | undefined} interval - The interval in milliseconds at which the callback function should be called.
 * @return {number} - The index of the interval that can be used to stop the interval later.
 * @throws {Error} - Throws an error if the callback function is not provided or is not a function.
 */
const setAsyncInterval = (cb: () => any, interval: number | undefined) => {
    if (cb && typeof cb === "function") {
        const intervalIndex = asyncIntervals.length;
        asyncIntervals.push(true);
        asyncIntervals.push({ run: true, id: 0 })
        runAsyncInterval(cb, interval, intervalIndex);
        return intervalIndex;
    } else {
        throw new Error('Callback must be a function');
    }
};

/**
 * Clears an asynchronous interval by stopping the specified interval with the given index.
 *
 * @param {number} intervalIndex - The index of the interval to be cleared.
 */
const clearAsyncInterval = (intervalIndex: number) => {
    if (asyncIntervals[intervalIndex].run) {
        clearTimeout(asyncIntervals[intervalIndex].id)
        asyncIntervals[intervalIndex].run = false
    }
}

export { typewriter, gibberish, shuffleArray, tooltip, capitalFirstLeter, randomString, clearAsyncInterval, setAsyncInterval };