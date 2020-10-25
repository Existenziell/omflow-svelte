<script>
  import LayoutPublic from "./routes/_LayoutPublic.svelte";
  import LayoutAdmin from "./routes/_LayoutAdmin.svelte";
  import { token, isLoggedIn, role } from "./stores";
  import { onMount } from "svelte";

  // props coming from a component (main.js)
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
    user = JSON.parse(localStorage.getItem("omflowUser"));
    // Verify token
    if (user) {
      const verified = await verifyToken();
      if (verified === false) {
        localStorage.clear();
      } else {
        isLoggedIn.set(true);
        token.set(user.token);
        role.set(user.user.role);
      }
    }
  });
</script>

<style>
</style>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

{#if role === 'admin'}
  <LayoutAdmin />
{:else}
  <LayoutPublic />
{/if}
