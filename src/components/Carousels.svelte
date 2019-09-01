<script>
  import HomeCarousel from "./HomeCarousel.svelte";
  export let xmodules;
  export let title;
</script>

<!-- Title -->
<h2 class="ui header">{title}</h2>

<!-- Carousel -->
<HomeCarousel {xmodules}/>
