<script>
  import { onMount } from "svelte";
  import { token } from "~/stores";
  import axios from "axios";

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

{#if loggedIn}
  <h2>Welcome {name}</h2>
{/if}
loggedIn:
{loggedIn}<br />
role:
{role}
<br />
token:
{token}
