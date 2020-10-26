<script>
  import Header from "./components/Header.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { token, isLoggedIn, role, teachers, fetchTeachers } from "./stores";
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
    // Check localStorage & Verify token
    user = JSON.parse(localStorage.getItem("omflowUser"));
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

    // Fetch teachers and put them in store ($teachers)
    $teachers = await fetchTeachers();
  });
</script>

<style>
</style>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<Header />
<Router {routes} />
