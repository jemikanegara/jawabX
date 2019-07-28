import {readable} from 'svelte/store';

export const materials = readable([], async set => {
    const res = await fetch("/materials.json").then(res => res.json());
    set(res.materials);
    return () => {};
})