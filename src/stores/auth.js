import { writable } from 'svelte/store';

export const auth = writable(false)
export const success = writable(null)