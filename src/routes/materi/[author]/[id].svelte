<script context="module">
  export function preload({ params }) {
    const id = params.id;
    return { id };
  }
  //   const answerType = "one-choice"
  //   const answerType = "multiple-choice"
  const answerType = "journal";
  //   const answerType = "table"
  //   const answerType = "essay"
</script>

<script>
  import Explanation from "../../../components/material/Explanation.svelte";
  export let id;
</script>

<style lang="scss">
  *:not(.header) {
    line-height: 2em !important;
  }
  i {
    font-size: 20px;
    &:hover{
      color: #2185d0;
    }
  }
  .click {
    cursor: pointer;
  }
</style>

<div>
  <span class="prev click">
    <i class="caret square left outline icon" />
  </span>
  <span>Materi 1 / 10</span>
  <span class="next click">
    <i class="caret square right outline icon" />
  </span>
</div>
<div class="ui header">Modul Akuntansi Dasar I : Perusahaan Jasa</div>
<div class="ui segment">
  <Explanation />
</div>
