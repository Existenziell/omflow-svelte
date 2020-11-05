<script>
  import { getContext } from "svelte";
  import { currentUser } from "../../stores";

  export let message;
  export let onCancel = () => {};

  const { close } = getContext("simple-modal");

  let email, password;
  let errorMessage = "";
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
      // ToDk: Adapt to flattened result from server for easier localStorage and store structure.
      const res = await fetch(`${process.env.API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });
      const result = await res.json();
      if (res.ok) {
        // Set values in $store -> localStorage
        currentUser.set(result);
        _onCancel();
      } else {
        errorMessage = result.msg;
      }
    } catch (err) {
      errorMessage = error;
    }
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
  form {
    width: 80%;
    margin: 20px auto;
  }
  .error-msg {
    color: salmon;
    font-size: 18px;
    margin-top: 15px;
    text-align: center;
  }
</style>

<h2>{message}</h2>
<div class=" card p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={email}
      type="text"
      name="email"
      placeholder="Email"
      class="input"
      required />
    <input
      bind:value={password}
      type="password"
      name="password"
      class="input mt-4"
      placeholder="Password"
      required />
    <p class="error-msg">{errorMessage}</p>
    <input type="submit" class="button is-primary" value="Login" />
  </form>
</div>
