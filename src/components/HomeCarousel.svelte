<script>
  import Carousel from "@beyonk/svelte-carousel";
  import SingleCard from "./SingleCard.svelte";
  export let windowWidth;
  import Siema from "siema";
  import { onMount } from "svelte";

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
    singleMaterials,
    singleMaterials,
    singleMaterials,
    singleMaterials,
    singleMaterials
  ];

  let newSiema;
  let thisInstance;

  let states = {
    currentSlide: 0,
    perPage: 0,
    slideLength: 0
  };

  // let currentSlide = newSiema ? newSiema.currentSlide : 0;
  // let perPage = newSiema ? newSiema.perPage : 0;
  // let slides = newSiema ? newSiema.innerElements.length : 0;

  const refreshStates = () => {
    const { currentSlide, perPage, innerElements } = newSiema;
    states = { currentSlide, perPage, slideLength: innerElements.length };
  };

  const changeSlide = prevOrNext => {
    prevOrNext === "next" ? newSiema.next() : newSiema.prev();
    refreshStates();
  };

  onMount(() => {
    newSiema = new Siema({
      perPage: {
        0: 2,
        479: 3,
        767: 4,
        980: 5
      }
    });
    thisInstance.classList.remove("siema");
    refreshStates();
  });
</script>

<style>
  button {
    background: #fff;
    border: none;
    padding: 10px;
    position: absolute;
    top: 30%;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
      0 3px 1px 0 rgba(20, 23, 28, 0.1);
    width: 45px;
    height: 45px;
    outline: none;
    cursor: pointer;
  }
  .slider {
    position: relative;
  }
  .next {
    right: -14px;
    text-align: right;
  }
  .prev {
    left: -14px;
  }
  i {
    font-size: 16px;
  }
</style>

<div class="slider">
  <div class="siema" bind:this={thisInstance}>
    {#each materials as material}
      <SingleCard {material} />
    {/each}
  </div>
  {#if states.currentSlide !== 0}
    <button class="prev" on:click={() => changeSlide('prev')}>
      <i class="chevron left icon" />
    </button>
  {/if}
  {#if states.currentSlide !== states.slideLength - states.perPage}
    <button class="next" on:click={() => changeSlide('next')}>
      <i class="chevron right icon" />
    </button>
  {/if}
</div>
