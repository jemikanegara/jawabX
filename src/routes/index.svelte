<script>
  import Carousels from "../components/Carousels.svelte";
  import { types } from "../stores/type.js";
  let windowWidth;
</script>
<!-- Set Title -->
<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!-- Get Window Width -->
<svelte:window bind:innerWidth={windowWidth} />

<!-- Carousels -->
{#if $types.length > 0}
  {#each $types as type, index}
    <Carousels {windowWidth} title={type.title} />
  {/each}
{/if}

