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
function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
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

//function to check device type is mobile or not
function isMobile(window: any, navigator: any) {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function angleBetween2Points(x1: number, y1: number, x2: number, y2: number) {
    let result = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
    if (result < 0) {
        result += 360;
    }
    return result;
}

export { typewriter, gibberish, shuffleArray, tooltip, capitalFirstLeter, randomString, clearAsyncInterval, setAsyncInterval, isMobile, angleBetween2Points };