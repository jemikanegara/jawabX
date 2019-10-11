<script>
  export let xmodules;
  export let currentSlide;
  export let title;

  import Journal from "../answer/Journal.svelte";
</script>

<!-- Iterate Answers -->
<div class="ui header">{title}</div>

{#each xmodules.pages[currentSlide].answers as answer}
  {#if answer.journal}
    <Journal
      {answer}
      showAnswer={xmodules.pages[currentSlide].type === 'CONCEPT' ? true : false}
      on:next />
  {:else if answer.single}
    <div>Single Choice (Radio Button)</div>
  {:else if answer.multi}
    <div>Checkbox</div>
  {:else}
    <div>Words</div>
  {/if}
{/each}
