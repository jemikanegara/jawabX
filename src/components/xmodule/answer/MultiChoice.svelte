<script>
  export let answer;
  export let showAnswer;

  import AnswerFeedback from "./AnswerFeedback.svelte";
  import AnswerButton from "./AnswerButton.svelte";
  import { getSolution } from "./solution.js";
  import { query } from "../../../graphql/queries/multi";

  const {
    multi: { options }
  } = answer;
  let isCorrect;
  let cheatButton;
  let submitButton;
  let userAnswer = [];

  const initialize = () => {
    isCorrect = undefined;
    cheatButton = undefined;
    submitButton = undefined;
    userAnswer = [];
  };

  initialize();

  const getTrueAnswer = async () => {
    const res = await getSolution(answer._id, query);
    if (!res) return;

    let options = res.data.solution.multi.trueAnswer;
    let trueAnswer = [];

    for (let key in options) {
      if (options[key]) {
        trueAnswer.push(key);
      }
    }

    return trueAnswer;
  };

  const checkSolution = async () => {
    const trueAnswer = await getTrueAnswer();

    if (trueAnswer.length !== userAnswer.length) {
      isCorrect = false;
    } else {
      let isCorrectTemp = false;

      for (let i = 0; i < trueAnswer.length; i++) {
        if (trueAnswer[i] !== userAnswer[i]) {
          isCorrectTemp = false;
          break;
        } else {
          isCorrectTemp = true;
        }
      }

      isCorrect = isCorrectTemp;
    }
  };

  const cheatSolution = async () => {
    const trueAnswer = await getTrueAnswer();
    userAnswer = trueAnswer;
    isCorrect = true;
  };
</script>

<div class="multi-choice">
  {#each options as option}
    <label>
      <input
        type="checkbox"
        name="multi-choice"
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
