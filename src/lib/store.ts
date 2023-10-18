import { writable, readable } from "svelte/store";

export const ufoBubble = writable("")

export const apiURL = readable("https://faewulf.xyz")

//3rd tab on window comp
export const app3rd = writable("")
export const S_boidsSettings = writable({
    speed: 0.5,
    visionRadius: 20,
    visionAngle: 120,
    localRadius: 80,
    rivalRadius: 100
})
export const S_boidsCount = writable(0)
export const S_boidChooseOption = writable("none")

