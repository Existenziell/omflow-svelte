<script>
  let name = "";
  let email = "";
  let password, passwordCheck;
  let result = null;
  let successMsg = "";

  const handleSubmit = async () => {
    const user = { email, password, passwordCheck, name };
    const res = await fetch(`${process.env.API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    });
    const response = await res.json();

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

<div class="register-form">
  <h1 class="title is-3">Signup to Omflow:</h1>

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

    {#if result}
      <p class="error-msg error-msg-register">{result}</p>
    {/if}
    <input type="submit" class="btn btn-info" />
  </form>
</div>
