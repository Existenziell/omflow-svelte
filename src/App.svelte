<script>
  import Header from "~/components/Header.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";

  // props coming from a component (main.js)
  export let appName;
  export let token;

  let API_URL = process.env.API_URL;
  let loggedIn = false;
  let role = "user";

  const isLoggedIn = async () => {
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
      return false;
    }

    const result = await axios.post(`${API_URL}/users/isTokenValid`, null, {
      headers: { "x-auth-token": token },
    });
    return result.data;
  };

  const getUserRole = async () => {
    let user = (
      await axios.get(`${API_URL}/users/`, {
        headers: { "x-auth-token": token },
      })
    ).data;
    return user.role;
  };

  onMount(async () => {
    loggedIn = await isLoggedIn();
    role = await getUserRole();
  });
</script>

<style>
</style>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<Header {loggedIn} {role} />
<Router {routes} />
