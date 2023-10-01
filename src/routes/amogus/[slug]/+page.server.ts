/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        value: params.slug
    };
}