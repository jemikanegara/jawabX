<script>
  export let answer;
  import { beforeUpdate } from "svelte";

  let journal = answer.journal;
  let trueAnswer = {};
  let total = {
    debit: 0,
    credit: 0
  };
  let balance = true;

  // Reactivity for Total Thousand Separator
  $: debitTotal = total.debit
    ? total.debit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
  $: creditTotal = total.credit
    ? total.credit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  // Mock Up Answer
  beforeUpdate(() => {
    if (!journal.trueAnswer) {
      journal.trueAnswer = {};

      journal.accounts.forEach(account => {
        trueAnswer[account] = { debit: "", credit: "" };
        journal.trueAnswer[account] = { debit: 0, credit: 0 };
      });
    }
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
      const value = e.target.value.replace(/,/g, "");
      trueAnswer[account][field] = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      journal.trueAnswer[account][field] = +value;
    } else {
      journal.trueAnswer[account][field] = 0;
      trueAnswer[account][field] = "";
    }
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
        <td data-label="Nama Akun" class="account">{account}</td>
        <td data-label="Debit">
          <input
            type="text"
            data-field="debit"
            data-account={account}
            bind:value={trueAnswer[account].debit}
            on:blur={balanceCheck}
            on:keyup={updateValue} />
        </td>
        <td data-label="Kredit">
          <input
            type="text"
            data-field="credit"
            data-account={account}
            bind:value={trueAnswer[account].credit}
            on:blur={balanceCheck}
            on:keyup={updateValue} />
        </td>
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
