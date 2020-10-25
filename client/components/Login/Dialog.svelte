<script>
  import { getContext } from "svelte";
  import { token, currentUser, isLoggedIn } from "../../stores";

  export let message;
  export let onCancel = () => {};

  const { close } = getContext("simple-modal");

  let email, password;

  let value;
  let onChange = () => {};

  function _onCancel() {
    onCancel();
    close();
  }

  $: onChange(value);

  const handleSubmit = async () => {
    const user = { email, password };
    try {
      const res = await fetch(`${process.env.API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });
      const result = await res.json();

      if (res.ok) {
        $currentUser = result;
        token.set(result.token);
        isLoggedIn.set(true);
        _onCancel();
      } else {
        displayError(result.msg);
      }
    } catch (err) {
      displayError(err);
    }
  };

  const displayError = (error) => {
    const msg = document.querySelector(".error-msg-login");
    msg.style.display = "block";
    msg.innerHTML = error;
  };
</script>

<style>
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  input {
    width: 100%;
  }
  .close {
    position: absolute;
    top: -2rem;
    right: 0;
    background: black;
  }
</style>

<button class="close" on:click={_onCancel}> Close </button>
<h2>{message}</h2>
<div class="login-form">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={email}
      type="text"
      name="email"
      placeholder="Email"
      required />
    <input
      bind:value={password}
      type="password"
      name="password"
      placeholder="Password"
      required />
    <p class="error-msg error-msg-login" />
    <input type="submit" class="btn btn-info" value="Login" />
  </form>
</div>
