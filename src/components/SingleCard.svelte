<script>
  import { onMount } from "svelte";
  import { IMG_URL } from "../data/url.js";

  export let xmodule;
  export let i;
  export let refreshStates;

  var clientX;
  let image;
  let backgroundImage = `background: url('${IMG_URL}/${xmodule.images[0].medium}') no-repeat;`;
  let backgroundSize = `background-size: cover;`;
  let imgStyle = `${backgroundImage}${backgroundSize}`;

  const stopLink = e => {
    const newClientX = e.clientX;
    newClientX !== clientX && e.preventDefault();
  };

  const setPosition = e => {
    const newClientX = e.clientX;
    clientX = newClientX;
  };

  const refresh = e => {
    refreshStates();
  };

</script>

<style lang="scss">
  .slide-content {
    display: block;
    padding: 10px;
    @media (max-width: 980px) {
      padding: 5px;
    }
  }
  .image {
    min-height: 100px;
    @media (max-width: 980px) {
      min-height: 75px;
    }
  }
  .header {
    font-size: 15px !important;
    @media (max-width: 980px) {
      font-size: 13px !important;
    }
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 1em !important; /* fallback */
    max-height: 2em; /* fallback */
    white-space: nowrap;
  }
  .meta {
    font-size: 12px !important;
    @media (max-width: 980px) {
      font-size: 10px !important;
    }
  }
  .description,
  .extra.content {
    @media (max-width: 980px) {
      font-size: 11px !important;
    }
  }
</style>

<a
  class="slide-content"
  href="modul/jawabx/213"
  rel="prefetch"
  on:mousedown={setPosition}
  on:click={stopLink}
  on:mousemove={refresh}>
  <div class="ui card">
    <div class="image" style={imgStyle} />
    <div class="content">
      <!-- Title -->
      <div class="header">{i}{xmodule.title}</div>
      <!-- Author -->
      <div class="meta">{xmodule.user.name}</div>
      <!-- Description -->
      <div class="description">{xmodule.description}</div>
    </div>
    <!-- Tried -->
    <div class="extra content">{xmodule.tried} kali dikerjakan</div>
  </div>
</a>
