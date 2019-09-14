<script>
  import { auth, success } from "../stores/auth.js";
  import { onMount } from "svelte";
  import { tokenCheck } from "../graphql/auth.js";
  import { goto } from "@sapper/app";
  import { query } from "../graphql/mutations/login.js";
  import { ajax } from "../graphql/settings.js";

  let email = "";
  let password = "";
  let errorMsg = {
    email: "",
    password: "",
    fail: ""
  };

  const login = async e => {
    e.preventDefault();

    for (let key in errorMsg) {
      errorMsg[key] = "";
    }

    if (!email || email === "") {
      errorMsg.email = "Mohon isi kolom email";
    }

    if (!password || password === "") {
      errorMsg.password = "Mohon isi kolom password";
      return;
    }

    const variables = { email, password };
    const res = await ajax(fetch, { query, variables });

    if (res.errors) {
      errorMsg.fail = "email atau kata sandi tidak cocok";
      return;
    } else if (res.data) {
      localStorage.setItem("token", res.data.login);
      auth.set(true);
      success.set("Kamu berhasil masuk");
      goto("/");
    }
  };

  onMount(async () => {
    const isAuth = await tokenCheck();
    if (isAuth) goto("/");
  });
</script>

<style lang="scss">
  @mixin mobile {
    @media (max-width: 980px) {
      @content;
    }
  }

  @mixin desktop {
    @media (min-width: 981px) {
      @content;
    }
  }

  .vertical.divider {
    @include mobile() {
      display: none;
    }
  }

  .horizontal.divider {
    @include desktop() {
      display: none;
    }
  }
</style>

<div class="ui placeholder segment">
  <div class="ui two column very relaxed stackable grid">
    <div class="column">
      <form class="ui form" on:submit={login}>
        <div class="field">
          <label>Email</label>
          <div class="ui left icon input">
            <input type="text" placeholder="Email" bind:value={email} />
            <i class="user icon" />
          </div>
          {#if errorMsg.email && errorMsg.email !== ''}
            <div class="ui negative message field">
              <i
                class="close icon"
                on:click={() => {
                  errorMsg.email = '';
                }} />
              <b>{errorMsg.email}</b>
            </div>
          {/if}
        </div>
        <div class="field">
          <label>Kata Sandi</label>
          <div class="ui left icon input">
            <input
              type="password"
              placeholder="Kata Sandi"
              bind:value={password} />
            <i class="lock icon" />
          </div>
          {#if errorMsg.password && errorMsg.password !== ''}
            <div class="ui negative message field">
              <i
                class="close icon"
                on:click={() => {
                  errorMsg.password = '';
                }} />
              <b>{errorMsg.password}</b>
            </div>
          {/if}
        </div>
        <button class="ui blue submit button fluid">Masuk</button>
        <br />
        {#if errorMsg.fail && errorMsg.fail !== ''}
          <div class="ui negative message field">
            <i
              class="close icon"
              on:click={() => {
                errorMsg.fail = '';
              }} />
            <b>{errorMsg.fail}</b>
          </div>
        {/if}
      </form>
    </div>
    <div class="middle aligned column">
      <div class="ui horizontal divider">Atau</div>
      <a href="/register">
        <div class="ui big button">
          <i class="signup icon" />
          Daftar
        </div>
      </a>
    </div>
  </div>
  <div class="ui vertical divider">Atau</div>
</div>
