import {readable} from 'svelte/store';

export const xmodules = readable([], async set => {
    const res = await fetch("/xmodules.json").then(res => res.json());
    set(res.xmodules);
    return () => {};
})