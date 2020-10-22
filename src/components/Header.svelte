<script>
  import {link} from 'svelte-spa-router'

  export let loggedIn;
  export let role;
</script>

<style>
</style>

<!--Navbar-->
<nav class="navbar navbar-expand-md navbar-light">

  <!-- Left / Navbar brand -->
  <div class="navbar-nav">
    <a href="/" class="navbar-brand mx-auto" use:link>Home</a>
  </div>

  <!-- Collapse button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
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
        {#if loggedIn}
          <li class="nav-item">
            <a href="/dashboard" class="nav-link" use:link>
              {role === 'user' ? "My Account" : "Dashboard"}
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<div class="header-forms">
  {#if loggedIn}
    <a href="/logout" class="btn btn-sm btn-outline-info" id="logout-user" use:link>Logout</a>
  {:else}
    <a href="/login" class="btn btn-sm btn-outline-info" use:link>Login</a>
    <a href="/signup" class="btn btn-sm btn-outline-info" use:link>Signup</a>
  {/if}
</div>
