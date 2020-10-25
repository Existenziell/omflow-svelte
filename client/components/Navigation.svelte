<script>
  import { link } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { isLoggedIn, role } from "../stores";

  let visible = false;

  onMount(async () => {
    visible = true;
  });
</script>

<style>
</style>

{#if visible}
  <!--Navbar-->
  <nav
    class="navbar navbar-expand-md navbar-light"
    in:fly={{ y: -200, duration: 500, delay: 400 }}>
    <!-- Left / Navbar brand -->
    <div class="navbar-nav">
      <a href="/" class="navbar-brand mx-auto" use:link>Home</a>
    </div>

    <!-- Collapse button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

    <!-- Collapsible content -->
    <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">
      <!-- Center -->
      <div class="mx-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/about" class="nav-link" use:link>About</a>
          </li>
          <li class="nav-item">
            <a href="/teachers" class="nav-link" use:link>Teachers</a>
          </li>
          <li class="nav-item">
            <a href="/classes" class="nav-link" use:link>Classes</a>
          </li>
          <li class="nav-item">
            <a href="/schedule" class="nav-link" use:link>Schedule</a>
          </li>
          <li class="nav-item">
            <a href="/matchme" class="nav-link" use:link>MatchMe</a>
          </li>
          <li class="nav-item">
            <a href="/map" class="nav-link" use:link>Map</a>
          </li>
          {#if $isLoggedIn}
            <li class="nav-item">
              <a href="/dashboard" class="nav-link" use:link transition:fade>
                {#if $role === 'user'}My Account{:else}Dashboard{/if}
              </a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
{/if}
