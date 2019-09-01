import { readable } from 'svelte/store';

const xmoduleTypes = [
    {
        title: "Modul Belajar"
    },
    { title: "Latihan" },
    { title: "Tes" }
]

export const types = readable(xmoduleTypes, (set) => {
    set(xmoduleTypes);
    return () => {}
});