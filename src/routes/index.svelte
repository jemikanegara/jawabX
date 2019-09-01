<script context="module">
  export function preload() {
    return this.fetch(`/xmodules.json`)
      .then(r => r.json())
      .then(res => {
        const xmodules = res.xmodules;
        return { xmodules };
      });
  }
</script>

<script>
  import Carousels from "../components/Carousels.svelte";
  import { types } from "../stores/type.js";
  export let xmodules;
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
