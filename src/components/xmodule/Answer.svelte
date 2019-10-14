<script>
  export let xmodules;
  export let currentSlide;
  export let title;

  import Journal from "./answer/Journal.svelte";
  import SingleChoice from "./answer/SingleChoice.svelte";

  $: showAnswer =
    xmodules.pages[currentSlide].type === "CONCEPT" ? true : false;
</script>

<!-- Iterate Answers -->
<div class="ui header">{title}</div>

{#each xmodules.pages[currentSlide].answers as answer}
  {#if answer.journal}
    <Journal {answer} bind:showAnswer on:next />
  {:else if answer.single}
    <SingleChoice {answer} bind:showAnswer on:next />
  {:else if answer.multi}
    <div>Checkbox</div>
  {:else}
    <div>Words</div>
  {/if}
{/each}
