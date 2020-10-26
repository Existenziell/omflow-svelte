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
  .container {
    width: 60%;
    margin: 20px auto;
  }
</style>

<div class="container">
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

  <form on:submit|preventDefault={handleSubmit} class="card p-6">
    <div class="field">
      <label for="" class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          bind:value={email}
          class="input"
          type="email"
          placeholder="Email input" />
        <span class="icon is-small is-left">
          <i class="fa fa-envelope" />
        </span>
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Password</label>
      <p class="control has-icons-left">
        <input
          bind:value={password}
          class="input"
          type="password"
          placeholder="Password" />
        <span class="icon is-small is-left"> <i class="fa fa-lock" /> </span>
      </p>
    </div>

    <div class="field">
      <label for="" class="label">Password Check</label>
      <p class="control has-icons-left">
        <input
          bind:value={passwordCheck}
          class="input"
          type="password"
          placeholder="Retype password" />
        <span class="icon is-small is-left"> <i class="fa fa-lock" /> </span>
      </p>
    </div>

    <div class="field">
      <label for="" class="label">User-Name</label>
      <div class="control">
        <input
          bind:value={name}
          class="input"
          type="text"
          placeholder="This is optional" />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">How did you hear about Omflow?</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Select</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label for="" class="checkbox">
          <input type="checkbox" />
          I agree to the
          <a href="/">terms & conditions</a>
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control"><button class="button is-link">Submit</button></div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</div>
