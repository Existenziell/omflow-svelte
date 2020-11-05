<script>
  import { currentSignupStep } from "../../stores";
  import { fly } from "svelte/transition";

  export let nextStep;
</script>

<div in:fly={{ x: -400, duration: 400 }}>
  <span class="indicator mb-5">5</span>
  <span class="title is-5 ml-3">Payment</span>

  <div class="card p-5">
    <button class="button">Redeem Coupon or Gift</button>
    <button class="button">Pay now</button>
    <button class="button">Pay with Paypal</button>

    <div class="navigation">
      <button
        class="button is-small"
        on:click|preventDefault={() => ($currentSignupStep -= 1)}>Back</button>
      <button
        class="button is-small"
        on:click|preventDefault={nextStep}>Next</button>
    </div>
  </div>
</div>
