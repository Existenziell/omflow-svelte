<script>
  import Intro from "./Intro.svelte";
  import Dashboard from "./Dashboard.svelte";
  import { currentUser, logout } from "../../stores";
</script>

<div class="webapp">
  {#if !$currentUser}
    <Intro />
  {:else}
    <Dashboard />
  {/if}
</div>
