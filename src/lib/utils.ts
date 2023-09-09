import tippy from "tippy.js";
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


// ultis funtion
export function tooltip(node: HTMLElement, params: any = {}) {
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

export function capitalFirstLeter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}