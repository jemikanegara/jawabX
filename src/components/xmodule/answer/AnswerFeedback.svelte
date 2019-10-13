<script>
  import { createEventDispatcher } from "svelte";
  export let isCorrect;

  const dispatch = createEventDispatcher();

  const next = () => {
    dispatch("next");
    dispatch("initialize");
  };
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
      <button class="ui yellow submit button" on:click={next}>Lanjut</button>
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
