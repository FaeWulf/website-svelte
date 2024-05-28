import { writable, readable } from 'svelte/store';
import { PUBLIC_server } from '$env/static/public';

export const ufoBubble = writable('');

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
export const S_boidsCount = writable(0);
export const S_boidsType = writable(1);
export const S_boidChooseOption = writable('none');
export const S_boidBorder = writable(false);
export const S_boidResetSignal = writable(false);
