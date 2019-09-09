<script>
  import { auth } from "../stores/auth.js";

  export let segment;

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
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

{#if segment !== 'login' && !$auth}
  <a href="login" class="ui item">Masuk</a>
{:else if $auth}
  <a href="/" class="ui item" on:click={logout}>Keluar</a>
{/if}
