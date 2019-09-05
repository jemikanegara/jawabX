<script context="module">
  import { JSON_OPT, URL } from "../graphql/settings.js";
  import { query } from "../graphql/queries/index.js";

  export function preload() {
    return this.fetch(URL, { ...JSON_OPT, body: JSON.stringify({ query }) })
      .then(r => r.json())
      .then(res => {
        const xmodules = res.data.modules;
        return { xmodules };
      });
  }
</script>

<script>
  import Carousels from "../components/Carousels.svelte";
  import { types } from "../stores/type.js";
  export let xmodules;
  console.log(xmodules)
</script>

<!-- Set Title -->
<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!-- Carousels -->
{#if $types.length > 0}
  {#each $types as type, index}
    <Carousels title={type.title} {xmodules} />
  {/each}
{/if}
