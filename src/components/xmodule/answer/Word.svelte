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
  input[type="text"] {
    width: 100%;
    border: 1px solid #666;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }

  div.message {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<input type="text" bind:value={userAnswer} />

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
