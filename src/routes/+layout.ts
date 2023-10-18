import { app3rd } from '$lib/store.js'

export function load({ url }) {

    const routeHide = [
        "/projects/boo"
    ]

    let hideDistractingComps = true
    let windowOnTop = false

    if (routeHide.includes(url.pathname)) {
        hideDistractingComps = false
    }

    if (url.pathname == "/projects/boids") {
        windowOnTop = true
        app3rd.set("boids")
    }
    else {
        windowOnTop = false
        app3rd.set("")
    }

    return {
        url: url.pathname,
        hideDistractingComps,
        windowOnTop
    }
}