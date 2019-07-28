<script>
  import HomeCarousel from "./HomeCarousel.svelte";
  export let materials;
  export let title;
</script>

<!-- Title -->
<h2 class="ui header">{title}</h2>

<!-- Carousel -->
<HomeCarousel {materials}/>
