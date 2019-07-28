<script context="module">
  export function preload() {
    return this.fetch(`/materials.json`)
      .then(r => r.json())
      .then(res => {
        const materials = res.materials;
        return { materials };
      });
  }
</script>

<script>
  import Carousels from "../components/Carousels.svelte";
  import { types } from "../stores/type.js";
  export let materials;
</script>

<!-- Set Title -->
<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!-- Carousels -->
{#if $types.length > 0}
  {#each $types as type, index}
    <Carousels title={type.title} {materials} />
  {/each}
{/if}
