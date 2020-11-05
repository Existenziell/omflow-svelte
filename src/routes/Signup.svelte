<script>
  import { afterUpdate, onMount } from "svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { fade, fly } from "svelte/transition";
  import { classes, currentUser, currentSignupStep } from "../stores";
  import Step0 from "../components/Signup/Step0.svelte";
  import Step1 from "../components/Signup/Step1.svelte";
  import Step2 from "../components/Signup/Step2.svelte";
  import Step3 from "../components/Signup/Step3.svelte";
  import Payment from "../components/Signup/Payment.svelte";
  import Confirmation from "../components/Signup/Confirmation.svelte";

  let result = null;
  let submitted = "";
  let loading = false;
  let name,
    email,
    location = "";
  let validationMessage = "";
  if ($currentUser) {
    ({ name, email, location } = $currentUser);
  }

  const handleSubmit = async () => {
    // loading = true;
    // const user = { email, password, passwordCheck, name };
    // const res = await fetch(`${process.env.API_URL}/signup`, {
    //   method: "POST",
    //   body: JSON.stringify(user),
    //   headers: { "Content-type": "application/json" },
    // });
    // const response = await res.json();
    // loading = false;
    // if (res.ok) {
    //   submitted = response.message;
    //   result = "";
    // } else {
    //   result = response.msg;
    //   submitted = "";
    // }
  };

  export let params;
  let ready = false;
  let practice = {};

  afterUpdate(async () => {
    if ($classes) {
      practice = $classes.filter((c) => c._id === params.id)[0];
      ready = true;
    }
  });

  const nextStep = () => {
    const f = document.getElementsByTagName("form")[0];
    if (f.checkValidity()) {
      setValidationMessage("");
      $currentSignupStep += 1;
    } else {
      setValidationMessage("Please fill out all required fields.");
      // console.log(document.getElementById("location").validationMessage);
    }
  };

  const setValidationMessage = (msg) => {
    validationMessage = msg;
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
  .validation {
    color: salmon;
  }
</style>

{#if ready}
  <div class="container mt-4">
    <form on:submit|preventDefault={handleSubmit} class="card p-6">
      {#if submitted}
        <Confirmation />
      {:else if $currentSignupStep === 0}
        <Step0 {practice} {nextStep} />
      {:else if $currentSignupStep === 1}
        <Step1 {name} {location} {email} {nextStep} />
      {:else if $currentSignupStep === 2}
        <Step2 {nextStep} />
      {:else if $currentSignupStep === 3}
        <Step3 {nextStep} />
      {:else if $currentSignupStep === 4}
        <Payment {nextStep} />
      {:else if $currentSignupStep === 5}
        <Confirmation />
      {/if}

      {#if loading}
        <BarLoader color="#077D84" />
      {/if}
      {#if result && !loading}
        <p class="error" in:fly={{ x: 50, duration: 400 }}>{result}</p>
      {/if}
      {#if submitted}
        <p class="success" in:fly={{ x: 200, duration: 400 }} out:fade>
          {submitted}
        </p>
      {/if}

      {#if $currentSignupStep === 5}
        <div class="field is-grouped mt-4">
          <div class="control">
            <button class="button is-primary" disabled={loading}>Submit</button>
          </div>
          <div class="control">
            <button class="button is-light" disabled={loading}>Cancel</button>
          </div>
        </div>
      {/if}
      <section class="validation mt-3">{validationMessage}</section>
    </form>
  </div>
{/if}
