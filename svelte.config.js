const preprocess = require('svelte-preprocess')

module.exports = {
    preprocess: preprocess({
        scss: true,
        globalStyle: true
    })
}