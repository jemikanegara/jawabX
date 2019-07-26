<script>
  export let segment;
</script>

<style lang="scss">
  a{
    text-transform: capitalize !important;
    color: #fff !important;
    @media(max-width: 980px){
      margin-left: auto;
    }
  }
</style>

{#if segment !== 'login'}
  <a href="login" class="ui item">Login</a>
{/if}
