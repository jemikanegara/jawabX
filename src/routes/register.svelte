<script>
  import { ajax } from "../graphql/settings.js";
  import { query } from "../graphql/mutations/register.js";
  import { tokenCheck } from "../graphql/auth.js";
  import { auth, success } from "../stores/auth.js";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { regEl, regFields } from "../data/register.js";

  onMount(async () => {
    const isAuth = await tokenCheck();
    if (isAuth) goto("/");
  });

  let passwordCheck = true;

  const register = async e => {
    e.preventDefault();

    let values = {};
    let error = [];

    // Check for empty fields
    for (let key in regEl) {
      // Check if field is empty
      if (regEl[key].value === "" && !regEl[key].optional) {
        regEl[key].errors.empty = true;
        error = [...error, key];
      }
      // Check if field is just password confirmation
      if (key !== "confirm") values[key] = regEl[key].value;
    }

    // If empty fields found return
    if (error.length > 0) return;

    // Check for password match with confirmation
    passwordCheck = regEl.password.value === regEl.confirm.value;

    // If password doesn't match then return
    if (!passwordCheck) return;

    // Register AJAX
    const res = await ajax(fetch, { query, variables: values });

    // If AJAX Fail but server throw errors
    if (res.errors) {
      return;
    }

    // If AJAX Success
    else if (res.data) {
      localStorage.setItem("token", res.data.register);
      auth.set(true);
      success.set("Akunmu berhasil didaftarkan");
      goto("/");
    }
  };
</script>

<style>
  form {
    min-width: 45vw;
  }

  .left-section {
    text-align: center;
    padding-right: 50px;
  }

  .left-section h4 {
    font-size: 18px;
    color: #333;
    margin-bottom: 0;
  }

  .left-section img {
    border-radius: 5px;
    border: 5px solid #fff;
    box-shadow: 0 0 3px #666;
    max-height: 400px;
  }

  .left-section > div {
    margin-bottom: 15px;
    color: #666;
  }

  .error.message:not(:empty) {
    display: block;
  }

  .agreement {
    color: #666;
  }

  .button {
    width: 100% !important;
  }

  @media all and (max-width: 980px) {
    .left-section {
      display: none;
    }
  }
</style>

<div class="ui two column stackable grid">
  <div class="two column row">
    <!-- Desktop Left Section -->
    <div class="left-section">
      <h4>Jawab atau Buat Soal</h4>
      <div>Daftar dan Asah Pengetahuanmu</div>
      <img
        src="/themes/default/assets/images/register-image.jpeg"
        alt="Register Image" />
    </div>

    <!-- Registration Form -->
    <form class="ui form" on:submit={register}>

      <!-- Input Fields -->
      {#each regFields as field}
        <div class="field">
          <label>{field.label}</label>
          {#if field.type === 'text'}
            <input type="text" bind:value={regEl[field.bind].value} />
            {#if regEl[field.bind].errors.empty && !regEl[field.bind].optional}
              <div class="ui error message">
                <b>{field.label} tidak boleh kosong.</b>
              </div>
            {/if}
          {:else}
            <input type="password" bind:value={regEl[field.bind].value} />
            {#if field.bind === 'confirm'}
              <div class="ui error message">
                {#if !passwordCheck}
                  <b>{field.label} tidak cocok.</b>
                {:else if regEl[field.bind].errors.empty}
                  <b>{field.label} tidak boleh kosong.</b>
                {/if}
              </div>
            {:else if regEl[field.bind].errors.empty}
              <div class="ui error message">
                <b>{field.label} tidak boleh kosong.</b>
              </div>
            {/if}
          {/if}
        </div>
      {/each}

      <!-- Checkbox -->
      <div class="field">
        <div class="agreement">
          Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta Kebijakan
          Privasi.
        </div>
      </div>
      <button class="ui primary button" type="submit">Daftar</button>
    </form>
  </div>
</div>
