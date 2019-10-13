<script>
  import AnswerButton from "./AnswerButton.svelte";
  import AnswerFeedback from "./AnswerFeedback.svelte";

  import { ajax } from "../../../graphql/settings";
  import { query } from "../../../graphql/queries/journal";
  import { createEventDispatcher } from "svelte";
  import { thousandRegex, toNumberRegex } from "../../../data/regex";

  export let answer;
  export let showAnswer; // CONCEPT or PRACTICE

  const dispatch = createEventDispatcher();

  let submitButton = "";
  let cheatButton = "";
  let journal = answer.journal;
  let trueAnswer = {};
  let total = {
    debit: 0,
    credit: 0
  };
  let balance = true;
  let solutionError = false;
  let isCorrect;

  // Reactivity for Total Thousand Separator
  $: debitTotal = total.debit
    ? total.debit.toString().replace(thousandRegex, ",")
    : "";
  $: creditTotal = total.credit
    ? total.credit.toString().replace(thousandRegex, ",")
    : "";

  // Initialize
  const initialize = () => {
    console.log(showAnswer);
    trueAnswer = {};
    total = {
      debit: 0,
      credit: 0
    };
    balance = true;
    solutionError = false;
    isCorrect = undefined;

    // Mock Up Answer
    journal.trueAnswer = {};

    journal.accounts.forEach(account => {
      trueAnswer[account] = { debit: "", credit: "" };
      journal.trueAnswer[account] = { debit: 0, credit: 0 };
    });

    const journalInit = () => {
      if (showAnswer) {
        cheatSolution();
      }
    };

    setTimeout(journalInit, 1);
  };

  initialize();

  // Reactivity For Total Value
  $: (() => {
    let calculateDebit = 0;
    let calculateCredit = 0;
    for (let key in journal.trueAnswer) {
      const debit = journal.trueAnswer[key].debit;
      const credit = journal.trueAnswer[key].credit;

      calculateDebit =
        typeof debit === "number" ? calculateDebit + debit : calculateDebit;
      calculateCredit =
        typeof credit === "number" ? calculateCredit + credit : calculateCredit;
    }

    const calculated = {
      debit: calculateDebit === 0 ? "" : calculateDebit,
      credit: calculateCredit === 0 ? "" : calculateCredit
    };

    total = calculated;
  })();

  // Check for total balance
  const balanceCheck = () => {
    const { debit, credit } = total;
    if (debit !== credit) balance = false;
    else balance = true;
  };

  // Update value with thousand separator
  const updateValue = e => {
    const field = e.target.dataset.field;
    const account = e.target.dataset.account;

    if (e.target.value) {
      const value = new String(e.target.value.replace(toNumberRegex, ""));
      const valueToNumber = +value;

      trueAnswer[account][field] = valueToNumber
        ? valueToNumber.toString().replace(thousandRegex, ",")
        : value.slice(0, -1).replace(thousandRegex, ",");
      journal.trueAnswer[account][field] = valueToNumber
        ? valueToNumber
        : journal.trueAnswer[account][field];
    } else {
      journal.trueAnswer[account][field] = 0;
      trueAnswer[account][field] = "";
    }
  };

  // AJAX to Get Solution
  const getSolution = async () => {
    const variables = { _id: answer._id };
    const token = localStorage.getItem("token");
    const res = await ajax(fetch, { query, variables, token });
    if (res.data.errors) {
      solutionError = true;
      return null;
    }
    return res;
  };

  // Get Solution By Cheating
  const cheatSolution = async e => {
    const res = await getSolution();
    if (!res) return;
    const solution = res.data.solution.journal.trueAnswer;
    journal.trueAnswer = solution;
    submitButton.disabled = true;
    isCorrect = true;

    for (let key in trueAnswer) {
      if (key !== "_id") {
        for (let subKey in trueAnswer[key]) {
          trueAnswer[key][subKey] = solution[key][subKey]
            .toString()
            .replace(thousandRegex, ",");

          if (solution[key][subKey] === 0) trueAnswer[key][subKey] = "";
        }
      }
    }
  };

  // Compare Solution
  const checkSolution = async e => {
    const res = await getSolution(e);
    const correctAnswer = res.data.solution.journal.trueAnswer;

    let isCorrectAnswer = false;

    for (let key in journal.trueAnswer) {
      if (
        journal.trueAnswer[key].debit === correctAnswer[key].debit &&
        journal.trueAnswer[key].credit === correctAnswer[key].credit
      ) {
        isCorrectAnswer = true;
      } else {
        isCorrectAnswer = false;
      }
    }

    if (isCorrectAnswer) isCorrect = true;
    else isCorrect = false;
  };
</script>

<style>
  table td {
    padding: 0 !important;
  }
  table th {
    width: 33.33%;
  }
  table input {
    background: none;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-family: "Lato", "Helvetica Neue", serif;
    letter-spacing: 0.5px;
  }
  table tr > td {
    padding-left: 10px !important;
    text-transform: capitalize;
  }
  .not-balance {
    color: #db2828;
  }
  .balance {
    color: #1ebc30;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .total-row {
    background: #eff0f1;
  }
  .total-row td:not(:first-child) {
    letter-spacing: 0.5px;
  }
  input:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 500px) {
    .balance,
    .not-balance {
      display: block;
    }
  }
</style>

<table class="ui unstackable celled table">
  <thead>
    <tr>
      <th>Akun</th>
      <th>Debit</th>
      <th>Kredit</th>
    </tr>
  </thead>
  <tbody>
    {#each journal.accounts as account}
      <tr>
        <td class="account">{account}</td>
        {#if !showAnswer}
          {#each Object.entries(trueAnswer[account]) as [position, amount]}
            <td>
              <input
                type="text"
                data-field={position}
                data-account={account}
                bind:value={trueAnswer[account][position]}
                on:blur={balanceCheck}
                on:keyup={updateValue}
                pattern="[0-9]"
                placeholder="-" />
            </td>
          {/each}
        {:else}
          {#each Object.entries(trueAnswer[account]) as [position, amount]}
            <td>{trueAnswer[account][position]}</td>
          {/each}
        {/if}
      </tr>
    {/each}
  </tbody>
  <tr class="total-row">
    <td>
      <strong>
        Total
        {#if !balance}
          <span class="not-balance">(Saldo Tidak Balance)</span>
        {:else if balance && debitTotal && creditTotal}
          <span class="balance">(Saldo Balance)</span>
        {/if}
      </strong>
    </td>
    <td>
      <strong>{debitTotal}</strong>
    </td>
    <td>
      <strong>{creditTotal}</strong>
    </td>
  </tr>
</table>

{#if !showAnswer && isCorrect !== undefined}
  <AnswerFeedback bind:isCorrect on:next on:initialize={initialize} />
{/if}

<AnswerButton
  bind:cheatButton
  bind:submitButton
  {isCorrect}
  {showAnswer}
  on:checkSolution={checkSolution}
  on:cheatSolution={cheatSolution} />
