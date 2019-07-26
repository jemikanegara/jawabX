import sveltePreprocess from 'svelte-preprocess';

const preprocess = sveltePreprocess({
    sass: true,
});

export default {
    client: {
        plugins: [
            svelte({
                preprocess
            })]
    },
    server: {
        plugins: [
            svelte({
                preprocess
            }),
        ],
    },
};