<script>
  import Nav from "../components/Nav.svelte";
  import { tokenCheck } from "../graphql/auth.js";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  
  export let segment;

  onMount(async () => {
    await tokenCheck();
  });
</script>

<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 980px) {
    .container {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
</style>

<Nav {segment} />
<main class="ui container">
  <slot />
</main>
