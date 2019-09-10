<script>
  export let segment;
  import Search from "./Search.svelte";
  import AuthButton from "./AuthButton.svelte";
  import { auth } from "../stores/auth.js";
  let routes = [
    {
      url: ".",
      segment: undefined,
      text: "Home",
      prefetch: false
    },
    {
      url: "modul",
      segment: "modul",
      text: "Modul",
      prefetch: false
    }
  ];

  let windowWidth;
</script>

<style lang="scss">
  $fullwidth: 100% !important;
  $bg: #2185d0 !important;

  a {
    text-transform: capitalize !important;
    color: #fff !important;
  }

  nav {
    background-color: $bg;
    > div {
      flex-wrap: wrap;
    }
  }

  .active::after {
    background-color: $bg;
    @media (max-width: 980px) {
      display: none;
    }
  }

  .right.menu {
    flex-wrap: wrap;
    width: 70%;
    @media (max-width: 980px) {
      width: $fullwidth;

      .item {
        width: $fullwidth;
      }
    }
    .item {
      width: 86%;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />
<nav class="ui pointing menu">
  <div class="ui container">
    <!-- Main Menu -->
    {#each routes as route}
      <a
        class={segment === route.segment ? 'active item' : 'item'}
        href={route.url}>
        {route.text}
      </a>
    {/each}

    <!-- Mobile Login Button -->
    {#if windowWidth <= 980 && !$auth}
      <AuthButton {segment} />
    {:else if windowWidth <= 980 && $auth}
      <AuthButton segment="logout" />
    {/if}

    <!-- Desktop Right Menu -->
    {#if !'modul'.includes(segment)}
      <div class="right menu">
        <div class="item">
          <Search />
        </div>
        <!-- Dekstop Login Button -->
        {#if windowWidth > 980 && !$auth}
          <AuthButton {segment} />
        {:else if windowWidth > 980 && $auth}
          <AuthButton segment="logout" />
        {/if}
      </div>
    {/if}

  </div>
</nav>
