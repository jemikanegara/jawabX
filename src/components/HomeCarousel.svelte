<script>
  import SingleCard from "./SingleCard.svelte";
  import Siema from "siema";
  import { onMount } from "svelte";

  export let materials;

  let newSiema;
  let thisInstance;

  let states = {
    currentSlide: 0,
    perPage: 0,
    slideLength: 0
  };

  const refreshStates = () => {
    const { currentSlide, perPage, innerElements } = newSiema;
    states = { currentSlide, perPage, slideLength: innerElements.length };
  };

  const changeSlide = prevOrNext => {
    prevOrNext === "next" ? newSiema.next() : newSiema.prev();
    refreshStates();
  };

  const shortcutSlide = firstOrLast => {
    firstOrLast === "first"
      ? newSiema.prev(newSiema.currentSlide)
      : newSiema.next(newSiema.innerElements.length - newSiema.currentSlide);
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
  <!-- Slider -->
  <div class="siema" bind:this={thisInstance}>
    {#each materials as material, i}
      <SingleCard {material} {i} {refreshStates} />
    {/each}
  </div>

  <!-- Back Arrow -->
  <button
    class="prev"
    style={states.currentSlide === 0 && 'opacity: 0;'}
    on:click={() => changeSlide('prev')}
    on:dblclick={() => shortcutSlide('first')}>
    <i class="chevron left icon" />
  </button>

  <!-- Next Arrow -->
  <button
    class="next"
    style={states.currentSlide === states.slideLength - states.perPage && 'opacity: 0;'}
    on:click={() => changeSlide('next')}
    on:dblclick={() => shortcutSlide('last')}>
    <i class="chevron right icon" />
  </button>

</div>
