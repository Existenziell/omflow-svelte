<script>
  import { onMount } from "svelte";
  import Header from "./components/Header.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import WebApp from "./components/WebApp/WebApp.svelte";

  import {
    currentUser,
    teachers,
    fetchTeachers,
    classes,
    fetchClasses,
  } from "./stores";

  // Props coming from main.js
  export let appName;

  let user;

  const verifyToken = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/users/isTokenValid`, {
        method: "POST",
        body: null,
        headers: { "x-auth-token": user.token },
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  onMount(async () => {
    // Check localStorage
    user = JSON.parse(localStorage.getItem("omflower"));
    if (user) {
      // Let the server verify the token
      const verified = await verifyToken();
      if (verified === false) {
        localStorage.clear();
      } else {
        // If verified, save in Store -> localStorage
        currentUser.set(user);
      }
    }

    // Fetch teachers and put them in store ($teachers)
    $teachers = await fetchTeachers();
    // Fetch classes and put them in store ($classes)
    $classes = await fetchClasses();
  });
</script>

<style>
  /* Accounting for the fixed navbar */
  .app {
    padding-top: 52px;
  }
</style>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

{#if location.href.includes('/app')}
  <WebApp />
{:else}
  <div class="app">
    <Header />
    <Router {routes} />
  </div>
{/if}
