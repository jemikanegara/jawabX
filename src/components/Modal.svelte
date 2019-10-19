<script>
  import { createEventDispatcher } from "svelte";

  export let show;
  export let value;
  export let data;
  export let label;
  export let submitMessage;
  export let edit;
  export let passwordData;

  const dispatch = createEventDispatcher();
  let timer;
  let passwordError;
  let passwordErrorMessage;

  //   let modalData = {
  //     header: "",
  //     error: "",
  //     success: "",
  //     submit: ""
  //   };

  $: disabled = passwordData.isError || data.isError ? true : false;

  const keyup = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch("keyup");
    }, 1000);
  };

  const submit = () => {
    if (disabled) return;
    dispatch("submit");
  };

  const close = () => {
    dispatch("close");
  };
</script>

<style>
  .modal-wrap {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
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
  .modal-content {
    margin-bottom: 10px;
    white-space: pre;
  }
</style>

<div class="modal-wrap" style={`display: ${show ? 'flex' : 'none'}`}>
  <div class="ui modal" style={`display: ${show ? 'block' : 'none'}`}>
    <div class="header">{edit ? 'Ganti ' : ''}{label}</div>
    <div class="content">
      <div class="modal-content">{data.content}</div>
      <div class="inline field">
        <div class="ui input">
          <input type="text" bind:value on:keyup={keyup} />
          {#if data.isError}
            <div class="ui left pointing red basic label">{data.error}</div>
          {:else if data.isError !== undefined}
            <div class="ui left pointing green basic label">{data.success}</div>
          {:else}
            <div class="ui left pointing yellow basic label">
              Masukkan {label}
            </div>
          {/if}
        </div>
        <slot />
      </div>
    </div>
    <div class="actions">
      <div class="ui cancel red button" on:click={close}>Batal</div>
      <div
        class={`ui approve button primary ${disabled ? 'disabled' : ''}`}
        on:click={submit}>
        {submitMessage}
      </div>
    </div>
  </div>
</div>
