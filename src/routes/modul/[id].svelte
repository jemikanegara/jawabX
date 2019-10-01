<script context="module">
  import { ajax } from "../../graphql/settings.js";
  import { query } from "../../graphql/queries/xmodule.js";

  export async function preload({ params }) {
    const variables = {
      _id: params.id
    };

    const res = await ajax(this.fetch, { query, variables });
    const xmodules = !res.data || res.data.errors ? null : res.data.module;
    return { xmodules };
  }
</script>

<script>
  import Explanation from "../../components/xmodule/Explanation.svelte";
  import Journal from "../../components/answer/Journal.svelte";

  export let xmodules;

  let thisInstance;
  let currentSlide = 0;
  let isFinish = false;

  const prev = () => {
    if (currentSlide > 0) currentSlide--;
  };

  const next = () => {
    if (currentSlide < xmodules.pages.length - 1) currentSlide++;
    if (currentSlide === xmodules.pages.length - 1) isFinish = true;
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

{#if !xmodules}
  <div>
    Maaf, Modul Tidak Ditemukan. Coba cari modul melalui fitur pencarian.
  </div>
{:else if isFinish}
  <div>Selamat, kamu telah berhasil menyelesaikan modul {xmodules.title}</div>
{:else}
  <div class="buttons">
    <span class="prev click" on:click={prev}>
      <i class="caret square left outline icon" />
    </span>
    <span class="text">
      Halaman {currentSlide + 1} / {xmodules.pages.length}
    </span>
    <span class="next click" on:click={next}>
      <i class="caret square right outline icon" />
    </span>
  </div>
  <div class="ui header">{xmodules.title}</div>
  <div class="author">oleh {xmodules.user.name}</div>
  <div class="ui segment">
    <!-- Concept / Quiz -->
    <Explanation
      xmodule={xmodules.pages[currentSlide]}
      title={xmodules.pages[currentSlide].type === 'quiz' ? 'Kuis' : 'Konsep'} />

    <!-- Example / Answer -->
    {#if xmodules.pages[currentSlide].type === 'CONCEPT'}
      <div class="ui header">Contoh</div>
    {:else if xmodules.pages[currentSlide].type === 'PRACTICE'}
      <div class="ui header">Jawab</div>
    {/if}

    <!-- Iterate Answers -->
    {#each xmodules.pages[currentSlide].answers as answer}
      {#if answer.journal}
        <Journal
          {answer}
          showAnswer={xmodules.pages[currentSlide].type === 'CONCEPT' ? true : false}
          on:next={next} />
      {:else if answer.single}
        <div>Single Choice (Radio Button)</div>
      {:else if answer.multi}
        <div>Checkbox</div>
      {:else}
        <div>Words</div>
      {/if}
    {/each}

  </div>
{/if}
