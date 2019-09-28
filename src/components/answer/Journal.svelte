<script>
  export let answer;

  let journal = answer.journal;
  let debitTotal = "";
  let creditTotal = "";
  let balance = true;

  if (!journal.trueAnswer) {
    journal.trueAnswer = {};

    journal.accounts.forEach(account => {
      journal.trueAnswer[account] = { debit: "", credit: "" };
    });
  }

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
    debitTotal = calculateDebit === 0 ? "" : calculateDebit;
    creditTotal = calculateCredit === 0 ? "" : calculateCredit;
  })();

  const checkTotal = () => {
    if (debitTotal !== creditTotal) balance = false;
    else balance = true;
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
    padding-left: 10px;
    font-family: "Lato", "Helvetica Neue", serif;
  }
  table > tr > td {
    padding-left: 10px !important;
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
        <td data-label="Nama Akun">{account}</td>
        <td data-label="Debit">
          <input
            type="number"
            bind:value={journal.trueAnswer[account].debit}
            on:blur={checkTotal}
            min="0" />
        </td>
        <td data-label="Kredit">
          <input
            type="number"
            bind:value={journal.trueAnswer[account].credit}
            on:blur={checkTotal}
            min="0" />
        </td>
      </tr>
    {/each}
  </tbody>
  <tr>
    <td>
      <strong>
        Total
        <span>(Saldo Tidak Balance)</span>
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
