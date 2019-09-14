<script context="module">
  export async function preload({ params }) {
    const id = params.id;
    const res = await this.fetch("/explanation.json").then(res => res.json());
    const xmodules = await res.modul;

    return { id, xmodules };
  }
</script>

<script>
  import Explanation from "../../../components/xmodule/Explanation.svelte";
  import Journal from "../../../components/answer/Journal.svelte";

  export let id;
  export let xmodules;

  let thisInstance;
  let currentSlide = 0;

  const prev = () => {
    if (currentSlide > 0) currentSlide--;
  };

  const next = () => {
    if (currentSlide < xmodules.length - 1) currentSlide++;
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
  <span class="text">Halaman {currentSlide + 1} / {xmodules.length}</span>
  <span class="next click" on:click={next}>
    <i class="caret square right outline icon" />
  </span>
</div>
<div class="ui header">Modul Akuntansi Dasar I : Perusahaan Jasa</div>
<div class="author">oleh JawabX</div>
<div class="ui segment">
  <!-- Concept / Quiz -->
  <Explanation
    xmodule={xmodules[currentSlide]}
    title={xmodules[currentSlide].type === 'quiz' ? 'Kuis' : 'Konsep'} />

  <!-- Example / Answer -->
  {#if xmodules[currentSlide].example}
    <div class="ui header">Contoh</div>
  {:else if xmodules[currentSlide].answer}
    <div class="ui header">Jawab</div>
  {/if}
  <Journal xmodule={xmodules[currentSlide]} />
</div>
