<script>
  import { auth } from "../stores/auth.js";
  export let segment;
</script>

<style lang="scss">
  a {
    text-transform: capitalize !important;
    color: #fff !important;
    @media (max-width: 980px) {
      margin-left: auto;
    }
  }
</style>

{#if segment !== 'login'}
  <a href="login" class="ui item">Masuk</a>
{:else}
  <a
    href="/"
    class="ui item"
    on:click={() => {
      auth.set(false);
    }}>
    Keluar
  </a>
{/if}
