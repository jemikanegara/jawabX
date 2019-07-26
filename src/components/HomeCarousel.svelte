<script>
  import Carousel from "@beyonk/svelte-carousel";
  import SingleCard from "./SingleCard.svelte";
  export let windowWidth;

  const singleMaterials = {
    title: "Modul Akuntansi Dasar 1: Perusahaan Jasa",
    author: "JawabX",
    description: "Akuntansi dasar",
    tried: 989
  };
  const materials = [
    singleMaterials,
    singleMaterials,
    singleMaterials,
    singleMaterials,
    singleMaterials,
    singleMaterials
  ];
</script>

<!-- <Carousel loop={false} perPage={windowWidth}>
  {#each materials as material}
    <SingleCard {material} />
  {/each}
</Carousel> -->
