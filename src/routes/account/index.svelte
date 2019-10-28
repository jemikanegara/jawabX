<script context="module">
  import { accountText } from "./_account.data.js";
  export async function preload() {
    return { accountText };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { ajax } from "../../graphql/settings.js";
  import { query as getQuery } from "../../graphql/queries/account.js";
  import { auth } from "../../stores/auth.js";
  import AccountEdit from "./_AccountEdit.svelte";

  export let accountText;
  let account = {};
  let token = "";

  let accountEdit = {};

  // Fetch Account Data
  const fetchAccount = async () => {
    const res = await ajax(fetch, { query: getQuery, token });
    if (!res.data || res.data.errors) {
      account = {};
    } else {
      const data = res.data.account;
      account = data;
      account.newPassword = "";
    }
  };

  // Set Mode to Edit or View Account
  const setMode = async (key, editMode) => {
    let unsubscribe = auth.subscribe(function(isAuth) {
      if (isAuth) accountText[key].edit = editMode;
    });
    unsubscribe();
  };

  onMount(() => {
    if (!$auth) window.location.href = "/";
    else {
      token = localStorage.getItem("token");
      fetchAccount();
      accountEdit = Object.assign({}, account);
    }
  });
</script>

<style>
  .profile {
    display: flex;
    flex-wrap: wrap;
    flex: 1 0 auto;
  }
  .left {
    padding: 5px 0;
    margin-right: 30px;
    margin-bottom: 10px;
  }
  .image {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 150px;
    height: 150px;
    border: 2px solid #aaa;
    color: #aaa;
    font-size: 50px;
    margin-bottom: 5px;
    background: #eee;
  }
  .image i {
    font-size: 80px;
  }
  .data {
    padding: 5px 0;
    display: flex;
  }
  label {
    width: 100px;
    font-weight: 700;
  }
  .content {
    margin-right: 10px;
    display: inline-block;
  }
  .edit-link {
    color: #2185d0;
    cursor: pointer;
  }
  .edit-link:hover {
    color: #ff5722;
  }
</style>

{#if $auth}
  <h2>Pengaturan</h2>
  <div class="profile">
    <div class="left">
      <div class="image">
        <i class="user icon" />
      </div>
      <button class="ui button primary fluid">Ubah Foto Profil</button>
    </div>
    <div class="right">
      {#each Object.keys(account) as key}
        <div class="data">
          {#if accountText[key]}
            <label>{accountText[key].label}</label>
            {#if accountText[key].edit}
              <AccountEdit
                on:close={() => {
                  setMode(key, false);
                }}
                on:refresh={() => {
                  fetchAccount();
                }}
                bind:accountEdit
                {key}
                {token}
                keyInfo={accountText[key]} />
            {:else if account[key]}
              <span class="content">{account[key]}</span>
              {#if key !== 'name'}
                <span
                  class="edit-link"
                  on:click={e => {
                    setMode(key, true);
                  }}>
                  Edit
                </span>
              {/if}
            {:else}
              <span
                class="edit-link"
                on:click={e => {
                  setMode(key, true);
                }}>
                Tambah
              </span>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div>Anda belum masuk</div>
{/if}
