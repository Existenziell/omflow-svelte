<script>
  import { currentSignupStep } from "../../stores";
  import { fly } from "svelte/transition";

  export let name, email, location, nextStep;
</script>

<div in:fly={{ x: -400, duration: 400 }}>
  <span class="indicator mb-5">2</span>
  <span class="title is-5 ml-3">Your information</span>

  <div class="field">
    <label for="" class="label">Name *</label>
    <div class="control">
      <input
        required
        bind:value={name}
        class="input"
        type="text"
        placeholder="Your Name" />
    </div>
  </div>

  <div class="field">
    <label for="" class="label">Email *</label>
    <div class="control has-icons-right">
      <input
        required
        bind:value={email}
        class="input"
        type="email"
        placeholder="Your Email" />
      <span class="icon is-small is-right"> <i class="fa fa-envelope" /> </span>
    </div>
  </div>

  <div class="field">
    <label for="" class="label">Phone</label>
    <div class="control has-icons-right">
      <input
        value=""
        class="input"
        type="tel"
        placeholder="Your phone number" />
      <span class="icon is-small is-right"> <i class="fa fa-phone" /> </span>
    </div>
  </div>

  <div class="field">
    <label for="" class="label">
      What city, country will you be practicing from? *</label>
    <div class="control">
      <input
        required
        bind:value={location}
        class="input"
        type="text"
        id="location"
        placeholder="Your current location" />
    </div>
  </div>

  <div class="field">
    <label for="" class="label">How did you hear about Omflow?</label>
    <div class="control">
      <div class="select">
        <select>
          <option>Select</option>
          <option>Friends</option>
          <option>Social Media</option>
          <option>Web Search</option>
        </select>
      </div>
    </div>
  </div>

  <div class="navigation">
    <button
      class="button is-small"
      on:click|preventDefault={() => ($currentSignupStep -= 1)}>Back</button>
    <button
      class="button is-small"
      on:click|preventDefault={nextStep}>Next</button>
  </div>
</div>
