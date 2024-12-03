import { readable, writable } from 'svelte/store';
import { PUBLIC_server } from '$env/static/public';
import type { track } from '$lib/types';

export const ufoBubble = writable({
	message: '',
	timeout: 0
});

export const apiURL = readable(PUBLIC_server);

//3rd tab on window comp
export const app3rd = writable('');
export const S_boidsSettings = writable({
	speed: 0.5,
	visionRadius: 20,
	visionAngle: 120,
	localRadius: 80,
	rivalRadius: 100,
	flockRadius: 0
});

//boid app
export const S_boidsCount = writable(0);
export const S_boidsType = writable(1);
export const S_boidChooseOption = writable('none');
export const S_boidBorder = writable(false);
export const S_boidResetSignal = writable(false);

//music player
export const mp_id = writable('qWNQUvIk954');
export const mp_autoPlay = writable(false);
export const mp_autoNext = writable(false);

//readonly
export const mp_currentList = writable([] as { index: number; data: track }[]);


