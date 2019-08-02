<script context="module">
  export async function preload({ params }) {
    const id = params.id;
    const res = await this.fetch("/explanation.json").then(res => res.json());
    const materials = res.materi;
    return { id, materials };
  }
</script>

<script>
  import Explanation from "../../../components/material/Explanation.svelte";
  import Quiz from "../../../components/material/Quiz.svelte"
  import Journal from "../../../components/answer/Journal.svelte";

  export let id;
  export let materials;

  let thisInstance;
  let currentSlide = 0;

  const prev = () => {
    if (currentSlide > 0) currentSlide--;
  };

  const next = () => {
    if (currentSlide < materials.length - 1) currentSlide++;
  };
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
  .author {
    color: #666;
  }
</style>

<div class="buttons">
  <span class="prev click" on:click={prev}>
    <i class="caret square left outline icon" />
  </span>
  <span class="text">Halaman {currentSlide + 1} / {materials.length}</span>
  <span class="next click" on:click={next}>
    <i class="caret square right outline icon" />
  </span>
</div>
<div class="ui header">Modul Akuntansi Dasar I : Perusahaan Jasa</div>
<div class="author">oleh JawabX</div>

<div class="ui segment">
  <!-- Concept / Quiz -->
  {#if materials[currentSlide].type === "concept"}
  <Explanation material={materials[currentSlide]} />
  {:else if materials[currentSlide].type === "quiz"}
  <Quiz material={materials[currentSlide]} />
  {/if}
  
  <!-- Example / Answer -->
  {#if materials[currentSlide].example}
    <div class="ui header">Contoh</div>
  {:else if materials[currentSlide].answer}
    <div class="ui header">Jawab</div>
  {/if}
  <Journal material={materials[currentSlide]} />
</div>
