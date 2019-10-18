<script>
  import { onMount } from "svelte";
  import { ajax } from "../../graphql/settings.js";
  import { query } from "../../graphql/queries/account.js";
  export let segment;

  let account;

  const initialize = async () => {
    const token = localStorage.getItem("token");
    const res = await ajax(fetch, { query, token });
    account = !res.data || res.data.errors ? null : res.data.account;
    console.log(account);
  };

  onMount(() => {
    initialize();
  });
</script>

<style>
  label {
    padding: 5px 0;
    display: block;
  }
  button {
    margin-top: 10px!important;
  }
</style>

<form>
  {#if account}
    {#each Object.keys(account) as key}
      <div>
        <label>{key[0].toUpperCase()}{key.substr(1)}</label>
        <div class="ui input">
          <input type="text" bind:value={account[key]} />
        </div>
      </div>
    {/each}
  {/if}
  <div>
    <button class="ui button primary">Submit</button>
  </div>
</form>
