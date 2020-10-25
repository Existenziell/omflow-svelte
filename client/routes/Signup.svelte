<script>
  import { BarLoader } from "svelte-loading-spinners";

  let name = "";
  let email = "";
  let password, passwordCheck;
  let result = null;
  let successMsg = "";
  let loading = false;

  const handleSubmit = async () => {
    loading = true;
    const user = { email, password, passwordCheck, name };
    const res = await fetch(`${process.env.API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    });
    const response = await res.json();
    loading = false;

    if (res.ok) {
      successMsg = response.message;
      result = "";
    } else {
      result = response.msg;
      successMsg = "";
    }
  };
</script>

<style>
  .success {
    color: green;
    font-size: 20px;
    margin-bottom: 20px;
  }
</style>

<div class="signup-form">
  <h1 class="title is-3">Signup to Omflow:</h1>

  {#if loading}
    <div class="is-flex">
      <BarLoader color="#077D84" />
    </div>
  {/if}

  {#if result && !loading}
    <p class="error-msg error-msg-signup">{result}</p>
  {/if}

  <p class="success">{successMsg}</p>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={name}
      type="text"
      name="name"
      placeholder="Name (optional)" />
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
    <input
      bind:value={passwordCheck}
      type="password"
      name="passwordCheck"
      placeholder="Retype password"
      required />
    <input type="submit" class="btn btn-info" />
  </form>
</div>
