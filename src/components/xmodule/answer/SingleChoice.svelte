<script>
  import AnswerFeedback from "./AnswerFeedback.svelte";
  import AnswerButton from "./AnswerButton.svelte";
  import { getSolution } from "./solution.js";
  import { query } from "../../../graphql/queries/single";

  export let answer;
  export let showAnswer;
  const {
    single: { options }
  } = answer;

  let userAnswer;
  let isCorrect;
  let submitButton = "";
  let cheatButton = "";

  const initialize = () => {
    userAnswer = undefined;
    isCorrect = undefined;
    submitButton = "";
    cheatButton = "";
  };

  initialize();

  const getTrueAnswer = async () => {
    const res = await getSolution(answer._id, query);
    if (!res) return;

    let options = res.data.solution.single.trueAnswer;
    let trueAnswer;

    for (let key in options) {
      if (options[key]) {
        trueAnswer = key;
        break;
      }
    }

    return trueAnswer;
  };

  const checkSolution = async e => {
    const trueAnswer = await getTrueAnswer();
    isCorrect = userAnswer === trueAnswer ? true : false;
  };

  const cheatSolution = async e => {
    const trueAnswer = await getTrueAnswer();
    userAnswer = trueAnswer;
    isCorrect = true;
  };
</script>

<style>
  .single-choice > * {
    display: inline-block;
  }
</style>

<div class="single-choice">
  {#each options as option}
    <label>
      <input
        type="radio"
        name="single-choice"
        value={option}
        bind:group={userAnswer} />
      {option.replace(/_/g, ' ')}
    </label>
  {/each}
</div>

{#if !showAnswer && isCorrect !== undefined}
  <AnswerFeedback bind:isCorrect on:next on:initialize={initialize} />
{:else}
  <AnswerButton
    bind:cheatButton
    bind:submitButton
    {isCorrect}
    {showAnswer}
    on:checkSolution={checkSolution}
    on:cheatSolution={cheatSolution}
    on:next
    on:initialize={initialize} />
{/if}