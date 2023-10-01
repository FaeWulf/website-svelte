export function load({ url }) {

    const routeHide = [
        "/projects/boids"
    ]

    let hideDistractingComps = true

    if (routeHide.includes(url.pathname)) {
        hideDistractingComps = false
    }


    return {
        url: url.pathname,
        hideDistractingComps
    }
}