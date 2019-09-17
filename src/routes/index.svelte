<script context="module">
  import { ajax } from "../graphql/settings.js";
  import { query } from "../graphql/queries/index.js";

  export async function preload() {
    const res = await ajax(this.fetch, { query });
    console.log(await res);
    if (res.errors || res.data.modules.length < 1)
      this.redirect(301, "/maintenance");

    const xmodules = await res.data.modules;
    return await { xmodules };
  }
</script>

<script>
  import Carousels from "../components/Carousels.svelte";
  import { types } from "../stores/type.js";
  import { success } from "../stores/auth.js";
  import { onDestroy } from "svelte";

  export let xmodules;

  onDestroy(() => {
    success.set(null);
  });
</script>

<!-- Set Title -->
<svelte:head>
  <title>JawabX - Berbagi Pengetahuan</title>
</svelte:head>

{#if !xmodules}
  <div>Maaf, Website sedang perbaikan</div>
{:else}
  {#if $success}
    <div class="ui success message">
      <i
        class="close icon"
        on:click={() => {
          success.set(null);
        }} />
      <b>{$success}</b>
    </div>
  {/if}

  <!-- Carousels -->
  {#if $types.length > 0}
    {#each $types as type, index}
      <Carousels title={type.title} {xmodules} />
    {/each}
  {/if}
{/if}
