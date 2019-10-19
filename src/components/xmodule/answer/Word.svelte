<script>
  export let answer;
  export let showAnswer;

  import AnswerFeedback from "./AnswerFeedback.svelte";
  import AnswerButton from "./AnswerButton.svelte";
  import { getSolution } from "./solution.js";
  import { query } from "../../../graphql/queries/word";

  let userAnswer;
  let isCorrect;
  let cheatButton;
  let submitButton;
  let isEmpty;

  const initialize = () => {
    userAnswer = undefined;
    isCorrect = undefined;
    cheatButton = "";
    submitButton = "";
    isEmpty = false;
  };

  initialize();

  const getTrueAnswer = async () => {
    const res = await getSolution(answer._id, query);
    if (!res) return;

    let trueAnswer = res.data.solution.word;
    return trueAnswer;
  };

  const checkSolution = async () => {
    if (!userAnswer) {
      isEmpty = true;
      return;
    }
    const trueAnswer = await getTrueAnswer();

    if (userAnswer.toLowerCase() === trueAnswer.toLowerCase()) isCorrect = true;
    else isCorrect = false;
  };

  const cheatSolution = async () => {
    const trueAnswer = await getTrueAnswer();

    userAnswer = trueAnswer;
    isCorrect = true;
  };
</script>

<style>
  div.message {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input {
    width: 100%;
    margin-bottom: 10px;
  }
</style>

<div class="ui input">
  <input type="text" bind:value={userAnswer} />
</div>
{#if isEmpty}
  <div class="ui message red">
    Jawaban tidak boleh kosong
    <button
      class="ui button green"
      on:click={() => {
        isEmpty = false;
      }}>
      Mengerti
    </button>
  </div>
{:else if !showAnswer && isCorrect !== undefined}
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
