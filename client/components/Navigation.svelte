<script>
  import { link } from "svelte-spa-router";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let visible = false;

  let links = [
    "About",
    "Teachers",
    "Classes",
    "Schedule",
    "MatchMe",
    "Map",
    "Dashboard",
  ];

  onMount(async () => {
    visible = true;
  });
</script>

<style>
  .nav-link {
    font-size: 18px;
  }
  a.nav-link:focus {
    font-weight: bold;
  }
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
          {#each links as l}
            <li class="nav-item">
              <a href="/{l.toLowerCase()}" class="nav-link" use:link>{l}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </nav>
{/if}
