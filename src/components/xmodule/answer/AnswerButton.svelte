<script>
  import { createEventDispatcher } from "svelte";

  export let cheatButton;
  export let submitButton;
  export let isCorrect;
  export let showAnswer;

  const dispatch = createEventDispatcher();
  const dispatchEvent = e => {
    dispatch([e.target.name], { target: e.target });
  };

</script>

<style>
  .buttons {
    display: flex;
  }
</style>

{#if isCorrect === undefined}
  <div class="buttons">
    {#if !showAnswer}
      <button
        class="ui submit button fluid"
        name="cheatSolution"
        bind:this={cheatButton}
        on:click={dispatchEvent}>
        Nyontek Solusi
      </button>
    {/if}
    <button
      class="ui blue submit button fluid"
      name="checkSolution"
      bind:this={submitButton}
      on:click={dispatchEvent}>
      Jawab
    </button>
  </div>
{/if}
