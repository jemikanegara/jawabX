<script>
  import HomeCarousel from "./HomeCarousel.svelte";
  export let windowWidth;
  export let title;
</script>

<!-- Title -->
<h2 class="ui header">{title}</h2>

<!-- Carousel -->
{#if windowWidth <= 479}
  <HomeCarousel windowWidth={2} />
{:else if windowWidth <= 767}
  <HomeCarousel windowWidth={3} />
{:else if windowWidth <= 980}
  <HomeCarousel windowWidth={4} />
{:else}
  <HomeCarousel windowWidth={5} />
{/if}
