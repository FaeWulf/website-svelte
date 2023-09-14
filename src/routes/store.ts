import { writable } from "svelte/store";

export const descriptionText = writable({ value: 0, text: '', learner: false })
export const titleText = writable({ value: "" })
