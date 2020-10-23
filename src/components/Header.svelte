<script>
  import { link } from "svelte-spa-router";
  import Navigation from "./Navigation.svelte";
  export let loggedIn;
  export let role;
</script>

<style>
  /* .header-forms {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
  } */
</style>

<div class="is-flex is-align-items-center is-justify-content-space-between">
  <Navigation {loggedIn} {role} />
  <div class="header-forms">
    {#if loggedIn}
      <a
        href="/logout"
        class="btn btn-sm btn-outline-info"
        id="logout-user"
        use:link>Logout</a>
    {:else}
      <a href="/login" class="btn btn-sm btn-outline-info" use:link>Login</a>
      <a href="/signup" class="btn btn-sm btn-outline-info" use:link>Signup</a>
    {/if}
  </div>
</div>
