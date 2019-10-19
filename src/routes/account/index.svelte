<script>
  import { onMount } from "svelte";
  import { ajax } from "../../graphql/settings.js";
  import { query as getQuery } from "../../graphql/queries/account.js";
  import { query as updateQuery } from "../../graphql/mutations/update.js";
  import { query as checkQuery } from "../../graphql/queries/check.js";
  import Modal from "../../components/Modal.svelte";

  export let segment;

  let account;
  let accountKeys = {
    name: {
      label: "Nama",
      edit: false
    },
    username: {
      label: "Username",
      edit: false,
      data: {
        header: "Tambah Username",
        content:
          " Username merupakan nama unik yang dapat dimiliki pengguna. \n Pemilihan username hanya dapat dilakukan sekali, selanjutnya tidak dapat diubah",
        error: "Username sudah terdaftar atau tidak dapat digunakan",
        success: "Username dapat digunakan",
        submit: "Simpan Username",
        isError: undefined
      }
    },
    email: {
      label: "Email",
      edit: false,
      data: {
        header: "Ubah Email",
        content: "Ubah email",
        error: "Email sudah terdaftar atau tidak dapat digunakan",
        success: "Email dapat digunakan",
        submit: "Simpan Email",
        isError: undefined
      }
    },
    phone: {
      label: "Telepon",
      edit: false,
      data: {
        header: "Ubah Nomor Telepon",
        content: "Ubah nomor telepon",
        error: "Nomor sudah terdaftar atau tidak dapat digunakan",
        success: "Nomor dapat digunakan",
        submit: "Simpan Nomor",
        isError: undefined
      }
    }
  };

  let token = localStorage.getItem("token");
  let showModal = false;

  const initialize = async () => {
    const res = await ajax(fetch, { query: getQuery, token });
    account = !res.data || res.data.errors ? null : res.data.account;
  };

  const check = async (e, key) => {
    let variables = {};
    variables[key] = account[key];
    const res = await ajax(fetch, { query: checkQuery, variables, token });
    const isAvailable = res.data.accountCheck;
    if (!isAvailable) accountKeys[key].data.isError = true;
    else accountKeys[key].data.isError = false;
  };

  const modify = async (e, key) => {
    let variables = {};
    variables[key] = account[key];
    const res = await ajax(fetch, { query: updateQuery, variables, token });
  };

  const edit = (e, key) => {
    accountKeys[key].edit = true;
    showModal = true;
  };

  const close = (e, key) => {
    accountKeys[key].edit = false;
    showModal = false;
  };

  onMount(() => {
    initialize();
  });
</script>

<style>
  .data {
    padding: 5px 0;
    display: flex;
  }
  label {
    width: 100px;
  }
  button {
    margin-top: 10px !important;
  }
</style>

<h2>Pengaturan</h2>
<form>
  {#if account}
    {#each Object.keys(account) as key}
      <div class="data">
        <label>{accountKeys[key].label}</label>
        {#if accountKeys[key].edit}
          <Modal
            bind:value={account[key]}
            show={showModal}
            bind:data={accountKeys[key].data}
            on:submit={e => modify(e, key)}
            on:keyup={e => check(e, key)}
            on:close={e => close(e, key)} />
        {:else if account[key]}
          <span>{account[key]}</span>
          {#if key !== 'name'}
            <span
              on:click={e => {
                edit(e, key);
              }}>
              Edit
            </span>
          {/if}
        {:else}
          <span
            on:click={e => {
              edit(e, key);
            }}>
            Tambah
          </span>
        {/if}
      </div>
    {/each}
  {/if}
  <div>
    <button class="ui button primary">Ubah</button>
  </div>
</form>
