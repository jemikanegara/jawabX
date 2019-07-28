<script>
  import Journal from "../answer/Journal.svelte";
  export let material;
</script>

<span>
  <div class="ui header">Penjelasan</div>
  <div class="description">{material.description}</div>
  <div class="ui header">Contoh</div>
  <Journal />
</span>