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
  .modal-content {
    margin-bottom: 10px;
    white-space: pre;
  }
  .ui.modal {
    display: block !important;
  }
</style>

<div class="modal-wrap">
  <div class="ui modal">
    <div class="header">
      <!-- Header -->
      <slot name="header" />
    </div>
    <div class="content">
      <div class="modal-content">
        <!-- Content -->
        <slot name="content" />
      </div>
      <div class="inline field">
          <!-- Input -->
          <slot name="input" />
      </div>
    </div>
    <div class="actions">
      <!-- Buttons -->
      <slot name="buttons" />
    </div>
  </div>
</div>
