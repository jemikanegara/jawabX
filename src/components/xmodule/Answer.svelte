<script>
  export let xmodules;
  export let currentSlide;
  export let title;

  import Journal from "./answer/Journal.svelte";
  import SingleChoice from "./answer/SingleChoice.svelte";
  import MultiChoice from "./answer/MultiChoice.svelte";
  import Word from "./answer/Word.svelte";
  import AnswerNext from "./answer/AnswerNext.svelte";

  $: showAnswer =
    xmodules.pages[currentSlide].type === "CONCEPT" ? true : false;
</script>

<!-- Iterate Answers -->
{#each xmodules.pages[currentSlide].answers as answer}
  {#if answer.journal}
    <div class="ui header">{title}</div>
    <Journal {answer} bind:showAnswer on:next />
  {:else if answer.single && !showAnswer}
    <div class="ui header">{title}</div>
    <SingleChoice {answer} bind:showAnswer on:next />
  {:else if answer.multi && !showAnswer}
    <div class="ui header">{title}</div>
    <MultiChoice {answer} bind:showAnswer on:next />
  {:else if !showAnswer}
    <div class="ui header">{title}</div>
    <Word {answer} bind:showAnswer on:next />
  {:else if showAnswer}
    <AnswerNext on:next {showAnswer} />
  {/if}
{/each}
