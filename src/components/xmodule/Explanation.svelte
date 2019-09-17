<script>
  export let xmodule;
  export let title;
</script>

<span>
  <div class="ui header">{title}</div>
  <div class="description">{@html xmodule.explanation}</div>
</span>