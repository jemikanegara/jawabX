<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let showAnswer;

  const dispatch = createEventDispatcher();

  const next = () => {
    dispatch("next");
    dispatch("initialize");
  };
</script>

<button
  class={`ui yellow submit button ${showAnswer ? 'fluid' : ''}`}
  on:click={next}>
  Lanjut
</button>
