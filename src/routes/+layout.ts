export function load({ url }) {

    const routeHide = [
        "/projects/boids"
    ]

    let hideDistractingComps = true
    let windowOnTop = false

    if (routeHide.includes(url.pathname)) {
        hideDistractingComps = false
    }

    if (url.pathname == "/projects/boids") {
        windowOnTop = true
    }




    return {
        url: url.pathname,
        hideDistractingComps,
        windowOnTop
    }
}