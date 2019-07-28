<script context="module">
  export async function preload({ params }) {
    const id = params.id;
    const res = await this.fetch("/explanation.json").then(res => res.json());
    const materials = res.materi;
    return { id, materials };
  }
  //   const answerType = "one-choice"
  //   const answerType = "multiple-choice"
  // const answerType = "journal";
  //   const answerType = "table"
  //   const answerType = "essay"
</script>

<script>
  import { onMount, afterUpdate } from "svelte";
  import Siema from "siema";

  import Explanation from "../../../components/material/Explanation.svelte";

  export let id;
  export let materials;

  let newSiema;
  let thisInstance;

  onMount(async () => {
    newSiema = materials.length > 0 ? new Siema() : null;
  });

  let currentSlide = 1;

  const updateSlide = () => {
    if(newSiema) currentSlide = currentSlide !== newSiema.current ? newSiema.currentSlide + 1 : 1;
  };

  const changeSlide = prevOrNext => {
    prevOrNext === "next" ? newSiema.next() : newSiema.prev();
    updateSlide();
  };

  // afterUpdate(() => {
  //   updateSlide();
  // })
</script>

<style lang="scss">
  *:not(.header) {
    line-height: 2em !important;
  }
  i {
    font-size: 20px;
    &:hover {
      color: #2185d0;
    }
  }
  .click {
    cursor: pointer;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eee;
    padding: 0 10px;

    & .text {
      line-height: 1em !important;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .author{
    color: #666;
  }
</style>

<div class="buttons">
  <span class="prev click" on:click={() => changeSlide('prev')}>
    <i class="caret square left outline icon" />
  </span>
  <span class="text">
    Materi {newSiema && currentSlide} / {newSiema && newSiema.innerElements.length}
  </span>
  <span class="next click" on:click={() => changeSlide('next')}>
    <i class="caret square right outline icon" />
  </span>
</div>
<div class="ui header">Modul Akuntansi Dasar I : Perusahaan Jasa</div>
<div class="author">oleh JawabX</div>
<div class="ui segment">
  <div class="siema" bind:this={thisInstance} on:touchmove={updateSlide} on:mouseover={updateSlide}>
    {#each materials as material}
      <Explanation {material} />
    {/each}
  </div>
</div>
