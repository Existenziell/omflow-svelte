<script>
  import { BarLoader } from "svelte-loading-spinners";
  import { fade, fly } from "svelte/transition";

  let name = "";
  let email = "";
  let password, passwordCheck;
  let result = null;
  let success = "";
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
      success = response.message;
      result = "";
    } else {
      result = response.msg;
      success = "";
    }
  };
</script>

<style>
  .container {
    width: 60%;
    margin: 20px auto;
  }
  .success {
    color: #077d84;
  }
  .error {
    padding: 10px;
    background: lightsalmon;
    color: white;
  }
</style>

<div class="container">
  <h1 class="title is-3">Signup to Omflow:</h1>

  <form
    on:submit|preventDefault={handleSubmit}
    class="card p-6"
    in:fly={{ y: 500, duration: 400 }}>
    {#if !success}
      <div class="field">
        <label for="" class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            bind:value={email}
            class="input"
            type="email"
            placeholder="Your Email" />
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
          <label for="terms" class="checkbox">
            <input type="checkbox" id="terms" />
            I agree to the
            <a href="/">terms & conditions</a>
          </label>
        </div>
      </div>
    {/if}

    {#if loading}
      <BarLoader color="#077D84" />
    {/if}
    {#if result && !loading}
      <p class="error" in:fly={{ x: 50, duration: 400 }}>{result}</p>
    {/if}
    {#if success}
      <p class="success" in:fly={{ x: 200, duration: 400 }} out:fade>
        {success}
      </p>
    {/if}

    {#if !success}
      <div class="field is-grouped mt-4">
        <div class="control">
          <button class="button is-primary" disabled={loading}>Submit</button>
        </div>
        <div class="control">
          <button class="button is-light" disabled={loading}>Cancel</button>
        </div>
      </div>
    {/if}
  </form>
</div>
