import { readable } from 'svelte/store';

const materialTypes = [
    {
        title: "Modul Belajar"
    },
    { title: "Latihan" },
    { title: "Tes" }
]

export const types = readable(materialTypes, (set) => {
    set(materialTypes);
    return () => {}
});