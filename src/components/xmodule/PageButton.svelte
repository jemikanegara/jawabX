<script>
  export let currentSlide;
  export let xmodules;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function next() {
    dispatch("next");
  }

  function prev() {
    dispatch("prev");
  }
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
  <span class="text">Halaman {currentSlide + 1} / {xmodules.pages.length}</span>
  <span class="next click" on:click={next}>
    <i class="caret square right outline icon" />
  </span>
</div>
