<script>
  export let xmodules;
  export let currentSlide;
  export let title;
  export let pageType;

  import Journal from "./answer/Journal.svelte";

  $: showAnswer = pageType === "CONCEPT" ? true : false;
</script>

<!-- Iterate Answers -->
<div class="ui header">{title}</div>

{#each xmodules.pages[currentSlide].answers as answer}
  {#if answer.journal}
    <Journal {answer} {showAnswer} on:next />
  {:else if answer.single}
    <div>Single Choice (Radio Button)</div>
  {:else if answer.multi}
    <div>Checkbox</div>
  {:else}
    <div>Words</div>
  {/if}
{/each}
