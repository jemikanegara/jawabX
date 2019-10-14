<script>
  import AnswerNext from "./AnswerNext.svelte";

  export let isCorrect;
</script>

<style>
  .response {
    padding-bottom: 15px;
  }
  .check-state {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div class="response">
  {#if isCorrect}
    <div class="ui green message check-state">
      Jawaban Benar
      <AnswerNext on:next on:initialize showAnswer={false} />
    </div>
  {:else}
    <div class="ui red message check-state">
      Jawaban Salah
      <button
        class="ui green submit button"
        on:click={() => {
          isCorrect = undefined;
        }}>
        Coba Lagi
      </button>
    </div>
  {/if}
</div>
