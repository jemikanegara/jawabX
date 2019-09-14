<script>
  export let segment;
  import Search from "./Search.svelte";
  import AuthButton from "./AuthButton.svelte";
  import { auth } from "../stores/auth.js";
  import { onMount } from "svelte";

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
  let nav;

  onMount(() => {
    nav.classList.remove("show");
    scrollingNav();
  });

  const scrollingNav = () => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      let isShow = nav.classList.contains("show");
      if (currentScrollPos < 50) {
        isShow && nav.classList.remove("show");
      } else if (prevScrollpos > currentScrollPos) {
        !isShow && nav.classList.add("show");
        nav.style.top = "0";
      } else {
        nav.style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    };
  };
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

  nav {
    transition: top 0.3s;
  }

  nav.show {
    position: fixed !important;
    top: 0;
    width: 100%;
    z-index: 99;
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />
<nav class="ui pointing menu show" bind:this={nav}>
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

  </div>
</nav>
