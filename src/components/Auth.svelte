<script>
  import { onMount } from "svelte";
  import { tokenCheck } from "../graphql/auth.js";

  onMount(async () => {
    const token = localStorage.getItem("token");
    const auth = await tokenCheck(token).then(res => console.log(res));
  });
</script>
