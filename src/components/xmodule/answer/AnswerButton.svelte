<script>
  import { createEventDispatcher } from "svelte";
  import AnswerNext from "./AnswerNext.svelte";

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

<div class="buttons">
  {#if isCorrect === undefined && !showAnswer}
    <button
      class="ui submit button fluid"
      name="cheatSolution"
      bind:this={cheatButton}
      on:click={dispatchEvent}>
      Nyontek Solusi
    </button>
    <button
      class="ui blue submit button fluid"
      name="checkSolution"
      bind:this={submitButton}
      on:click={dispatchEvent}>
      Jawab
    </button>
  {:else}
    <AnswerNext on:next on:initialize {showAnswer} />
  {/if}
</div>
