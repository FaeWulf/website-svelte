/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        value: params.slug,
        meta: {
            title: 'Amongusify',
            description: 'Instead of shortening your url, this simple tool will convert urls into a bunch of crew mates.',
            keywords: ['link converter', 'amongus', 'sus']
        }
    };
}