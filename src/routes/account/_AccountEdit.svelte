<script>
  import Modal from "../../components/Modal.svelte";
  import { accountEditText as accountEditBluePrint } from "./_account.data.js";
  import { createEventDispatcher } from "svelte";

  // API
  import { ajax } from "../../graphql/settings.js";
  import { query as updateQuery } from "../../graphql/mutations/update.js";
  import { query as checkQuery } from "../../graphql/queries/check.js";

  export let key;
  export let token;
  export let keyInfo;
  export let accountEdit;

  let accountEditText = Object.assign({}, accountEditBluePrint);
  let password = ""
  let confirmNewPassword;
  $: isNewPassword = key === "newPassword";

  let dispatch = createEventDispatcher();
  let variables = {};
  let timer = {};
  $: disabled =
    password.length < 6 || accountEditText[key].isError ? true : false;

  // Check Single Data of Account
  const checkData = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!accountEdit[key]) return (accountEditText[key].isError = undefined);
      variables[key] = accountEdit[key];
      ajax(fetch, {
        query: checkQuery,
        variables,
        token
      }).then(res => {
        const isAvailable = res.data.accountCheck;
        if (!isAvailable) accountEditText[key].isError = true;
        else accountEditText[key].isError = false;
      });
    }, 1000);
  };

  // Modify Single Data of Account
  const modifyData = async () => {
    variables[key] = accountEdit[key];
    variables.password = password;
    const res = await ajax(fetch, {
      query: updateQuery,
      variables,
      token
    });
    if (res.data.update) setMode(key, false);
  };

  // Validate Password
  const validatePassword = async () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (password.length < 6) accountEditText.password.isError = true;
      else accountEditText.password.isError = false;
    }, 1000);
  };

  // Close Modal
  const close = () => {
    dispatch("close");
  };
</script>

<style>
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
  .input {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .input > * {
    max-width: 50%;
    width: 50%;
  }
  .input:last-child {
    margin-top: 10px;
  }
</style>

<Modal>
  <!-- Header -->
  <span slot="header">{keyInfo.label}</span>

  <!-- Content -->
  <span slot="content">{accountEditText[key].content}</span>

  <!-- Input -->
  <span slot="input">
    <div class="ui input">

      <!-- Input Field -->
      {#if isNewPassword}
        <input
          type="password"
          bind:value={accountEdit[key]}
          on:keyup={checkData} />
      {:else}
        <input type="text" bind:value={accountEdit[key]} on:keyup={checkData} />
      {/if}

      <!-- Input Feedback -->
      {#if accountEditText[key].isError}
        <div class="ui left pointing red basic label">
          {accountEditText[key].error}
        </div>
      {:else if accountEditText[key].isError !== undefined}
        <div class="ui left pointing green basic label">
          {accountEditText[key].success}
        </div>
      {:else}
        <div class="ui left pointing yellow basic label">
          Masukkan {keyInfo.label}
        </div>
      {/if}

      <!-- New Password -->
      {#if key === 'newPassword'}
        <div class="password">
          <div class="password-label">Ulangi Kata Sandi Baru</div>
          <div class="ui input">
            <input
              type="password"
              bind:value={confirmNewPassword}
              on:keyup={validatePassword} />
            {#if accountEditText.confirmNewPasswordText.isError}
              <div class="ui left pointing red basic label">
                {accountEditText.confirmNewPasswordText.error}
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Password -->
    <div class="password">
      <div class="password-label">Kata Sandi Aktif</div>
      <div class="ui input">
        <input
          type="password"
          bind:value={password}
          on:keyup={validatePassword} />
        {#if accountEditText.password.isError}
          <div class="ui left pointing red basic label">
            {accountEditText.password.error}
          </div>
        {/if}
      </div>
    </div>
  </span>

  <!-- Buttons -->
  <span slot="buttons">
    <div class="ui cancel red button" on:click={close}>Batal</div>
    <div
      class={`ui approve button primary ${disabled ? 'disabled' : ''}`}
      on:click={modifyData}>
      Simpan
    </div>
  </span>
</Modal>
