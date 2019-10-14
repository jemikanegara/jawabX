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
  import PageButton from "../../components/xmodule/PageButton.svelte";
  import Answer from "../../components/xmodule/Answer.svelte";

  export let xmodules;

  let thisInstance;
  let currentSlide = 0;
  let isFinish = false;

  const prev = () => {
    if (currentSlide > 0) currentSlide--;
  };

  const next = () => {
    if (currentSlide < xmodules.pages.length - 1) currentSlide++;
  };

  const nextCorrect = () => {
    if (currentSlide === xmodules.pages.length - 1) isFinish = true;
    else next();
  };
</script>

<style lang="scss">
  *:not(.header) {
    line-height: 2em !important;
  }
  .author {
    color: #666;
  }
</style>

{#if !xmodules}
  <!-- Not Found -->
  <div>
    Maaf, Modul Tidak Ditemukan. Coba cari modul melalui fitur pencarian.
  </div>
{:else if isFinish}
  <!-- Finish -->
  <div>Selamat, kamu telah berhasil menyelesaikan modul {xmodules.title}</div>
{:else}

  <!-- Switch Page -->
  <PageButton on:prev={prev} on:next={next} {currentSlide} {xmodules} />

  <!-- Module Info -->
  <div class="ui header">{xmodules.title}</div>
  <div class="author">oleh {xmodules.user.name}</div>

  <!-- Module Content -->
  <div class="ui segment">

    <!-- Explanation -->
    <Explanation
      xmodule={xmodules.pages[currentSlide]}
      title={xmodules.pages[currentSlide].type === 'CONCEPT' ? 'Penjelasan' : 'Latihan'} />

    <!-- Answers -->
    <Answer
      on:next={nextCorrect}
      {xmodules}
      {currentSlide}
      title={xmodules.pages[currentSlide].type === 'CONCEPT' ? 'Contoh' : 'Jawab'} />
  </div>
{/if}
