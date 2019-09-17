<script>
  export let xmodule;

  console.log(xmodule);
</script>

<style>
  table td {
    padding: 0 !important;
  }

  table th {
    width: 33.33%;
  }
  table input,
  table select {
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
    <tr>
      <td data-label="Nama Akun">
        <select>
          <option value="Biaya">Kas</option>
          <option value="Biaya">Biaya</option>
          <option value="Biaya">Modal</option>
        </select>
      </td>
      <td data-label="Debit">
        <input type="number" />
      </td>
      <td data-label="Kredit">
        <input type="number" />
      </td>
    </tr>
  </tbody>
  <tr>
    <td>
      <strong>Total</strong>
    </td>
    <td />
    <td />
  </tr>
</table>
