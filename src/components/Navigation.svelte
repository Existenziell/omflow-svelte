<script>
  import { link, push } from "svelte-spa-router";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import Login from "./User/Login.svelte";
  import Modal from "./User/Modal.svelte";
  import { currentUser, logout } from "../stores";

  let visible = false;

  let links = [
    "About",
    "Teachers",
    "Classes",
    "Schedule",
    "MatchMe",
    "Map",
    "Dashboard",
    "App",
  ];

  const logoutAndRedirect = () => {
    // Reset localStorage and set values in store
    logout();
    // Navigate to / (Router)
    push("/");
  };

  onMount(async () => {
    visible = true;
  });
</script>

<style>
  .navbar-item a {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
  }
  .navbar-item a:focus,
  .navbar-item a:hover {
    font-weight: bold;
  }
  .navbar {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>

{#if visible}
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
    in:fly={{ y: -200, duration: 500, delay: 400 }}>
    <div class="navbar-brand">
      <a class="navbar-item" href="/" use:link aria-hidden="true">
        <img src="public/logo-text-black.png" alt="Logo" />
      </a>

      <!-- Collapse button -->
      <a
        href="/"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar">
        <span aria-hidden="true">About</span>
        <span aria-hidden="true">Teachers</span>
        <span aria-hidden="true">Classes</span>
        <span aria-hidden="true">Classes</span>
        <span aria-hidden="true">Schedule</span>
        <span aria-hidden="true">MatchMe</span>
        <span aria-hidden="true">Map</span>
        <span aria-hidden="true">Dashboard</span>
        <span aria-hidden="true">App</span>
      </a>
    </div>

    <!-- Collapsible content -->
    <div id="navbar" class="navbar-menu">
      <ul class="navbar-end">
        {#each links as l}
          <li class="navbar-item">
            <a href="/{l.toLowerCase()}" use:link>{l}</a>
          </li>
        {/each}
      </ul>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {#if $currentUser}
              <button
                on:click|preventDefault={logoutAndRedirect}
                class="button is-small">Logout</button>
            {:else}
              <Modal>
                <Login type="is-small" />
              </Modal>
              <button
                on:click={() => push('/user/signup')}
                class="button is-primary is-small">Signup</button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </nav>
{/if}
