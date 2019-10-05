<script>
  import { ajax } from "../../graphql/settings";
  import { query } from "../../graphql/queries/journal";
  import { createEventDispatcher } from "svelte";

  export let answer;
  export let showAnswer; // CONCEPT or PRACTICE

  const dispatch = createEventDispatcher();
  const thousandRegex = /\B(?=(\d{3})+(?!\d))/g;
  const toNumberRegex = /,/g;
  let submitButton;
  let cheatButton;

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

  // Mock Up Answer
  journal.trueAnswer = {};

  journal.accounts.forEach(account => {
    trueAnswer[account] = { debit: "", credit: "" };
    journal.trueAnswer[account] = { debit: 0, credit: 0 };
  });

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

  const cheatSolution = async e => {
    e.target.disabled = true;
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

  const next = () => {
    dispatch("next");
    isCorrect = undefined;
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
  .buttons {
    display: flex;
  }
  input:focus::placeholder {
    color: transparent;
  }
  .response {
    padding-bottom: 15px;
  }
  .check-state {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  <div class="response">
    {#if isCorrect}
      <div class="ui green message check-state">
        Jawaban Benar
        <button class="ui yellow submit button" on:click={next}>Lanjut</button>
      </div>
    {:else}
      <div class="ui red message check-state">
        Jawaban Salah
        <button
          class="ui green submit button"
          on:click={() => {
            isCorrect = undefined;
          }}>
          Coba Lagi
        </button>
      </div>
    {/if}
  </div>
{/if}

{#if isCorrect === undefined}
  <div class="buttons">
    {#if !showAnswer}
      <button
        class="ui submit button fluid"
        on:click={cheatSolution}
        bind:this={cheatButton}>
        Nyontek Solusi
      </button>
    {/if}
    <button
      class="ui blue submit button fluid"
      bind:this={submitButton}
      on:click={checkSolution}>
      Jawab
    </button>
  </div>
{/if}
