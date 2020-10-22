<script>
  import { onMount } from "svelte";
  import { token } from '~/stores';
  import axios from 'axios';
  import Loading from "~/components/Loading.svelte";

  let API_URL = process.env.API_URL;
  let loading = false;
  let loggedIn = false;
  let role = 'user';

  const isLoggedIn = async () => {
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
      return false;
    }

    const result = await axios.post(
      `${API_URL}/users/isTokenValid`,
      null,
      { headers: { "x-auth-token": token } }
    )
    return result.data;
  }

  const getUserRole = async () => {
    let user = (await (axios.get(`${API_URL}/users/`, { headers: { "x-auth-token": token } }))).data;
    return user.role;
  }

  onMount(async () => {
    loading = true;
    loggedIn = await isLoggedIn();
    role = await getUserRole();
    loading = false;
  });
</script>

{#if loading}
  <Loading />
{:else}
  {#if loggedIn}
    <h2>Welcome {name}</h2>
  {/if}
  loggedIn: {loggedIn}<br />
  role: {role} <br />
  token: {token}
{/if}
