<script>
  import { auth } from "../stores/auth.js";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  const login = () => {
    $auth = true;
    loggedIn();
  };
  const loggedIn = () => {
    $auth && goto(".");
  };
  onMount(() => {
    loggedIn();
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
      <div class="ui form">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
            <input type="text" placeholder="Username" />
            <i class="user icon" />
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input type="password" />
            <i class="lock icon" />
          </div>
        </div>
        <div class="ui blue submit button" on:click={login}>Login</div>
      </div>
    </div>
    <div class="middle aligned column">
      <div class="ui horizontal divider">Or</div>
      <div class="ui big button">
        <i class="signup icon" />
        Sign Up
      </div>
    </div>
  </div>
  <div class="ui vertical divider">Or</div>
</div>
