<script>
  import { link } from "svelte-spa-router";
  import { logout, isLoggedIn, role } from "../stores";

  import Navigation from "./Navigation.svelte";
  import Login from "./Login/Login.svelte";
  import Modal from "./Login/Modal.svelte";

  const logoutAndRedirect = () => {
    isLoggedIn.set(false);
    logout();
  };
</script>

<style>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<!-- <pre>isLoggedIn: {JSON.stringify($isLoggedIn)}<br />Role: {JSON.stringify($role)}</pre> -->

<div class="header-container">
  <Navigation {$isLoggedIn} {$role} />
  <div class="header-forms">
    {#if $isLoggedIn}
      <button
        on:click={logoutAndRedirect}
        class="btn btn-sm btn-outline-info">Logout</button>
    {:else}
      <Modal>
        <Login />
      </Modal>
      <a href="/signup" class="btn btn-sm btn-outline-info" use:link>Signup</a>
    {/if}
  </div>
</div>
