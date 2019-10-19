<script>
  import { onMount } from "svelte";
  import { ajax } from "../../graphql/settings.js";
  import { query as getQuery } from "../../graphql/queries/account.js";
  import { query as updateQuery } from "../../graphql/mutations/update.js";
  import { query as checkQuery } from "../../graphql/queries/check.js";
  import Modal from "../../components/Modal.svelte";

  let account;
  let password;
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

  const passwordData = {
    content: "Masukkan Password",
    error: "Password minimal 6 karakter",
    isError: false
  };

  let token = localStorage.getItem("token");
  let showModal = false;
  let showPasswordModal = false;

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
    variables.password = password;
    const res = await ajax(fetch, { query: updateQuery, variables, token });
    console.log(res);
    if (res.data.update) close(e, key);
    else console.log(res);
  };

  const edit = (e, key) => {
    accountKeys[key].edit = true;
    showModal = true;
  };

  const close = (e, key) => {
    accountKeys[key].edit = false;
    showModal = false;
  };

  let timer;

  const validatePassword = e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (password.length < 6) passwordData.isError = true;
      else passwordData.isError = false;
    }, 1000);
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
  .password {
    margin-top: 10px;
  }
  .password .input {
    width: 100%;
  }
  .password input,
  .password .ui.label {
    width: 50%;
    max-width: 50%;
  }
  .password .password-label {
    margin-bottom: 5px;
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
            {passwordData}
            bind:show={showModal}
            label={accountKeys[key].label}
            bind:data={accountKeys[key].data}
            on:submit={e => modify(e, key)}
            on:keyup={e => check(e, key)}
            on:close={e => close(e, key)}
            submitMessage={'Simpan'}
            edit={true}>
            <div class="password">
              <div class="password-label">Masukkan Password</div>
              <div class="ui input">
                <input
                  type="password"
                  bind:value={password}
                  on:keyup={validatePassword}
                  autocomplete="current-password" />
                {#if passwordData.isError}
                  <div class="ui left pointing red basic label">
                    {passwordData.error}
                  </div>
                {/if}
              </div>
            </div>
          </Modal>
        {:else if account[key]}
          <span class="content">{account[key]}</span>
          {#if key !== 'name'}
            <span
              class="edit-link"
              on:click={e => {
                edit(e, key);
              }}>
              Edit
            </span>
          {/if}
        {:else}
          <span
            class="edit-link"
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
