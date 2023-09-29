
export async function load({ url }) {

    let idx = Number(url.searchParams.get('idx'))

    if (!idx || Number.isNaN(idx))
        idx = 1

    return {
        idx
    };
}