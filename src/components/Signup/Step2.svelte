<script>
  import { currentSignupStep } from "../../stores";
  import { fly } from "svelte/transition";

  export let nextStep;
</script>

<div in:fly={{ x: -400, duration: 400 }}>
  <span class="indicator mb-5">3</span>
  <span class="title is-5 ml-3">Your Safety and Experience</span>

  <div class="field">
    <label for="" class="label">Is this your first time practicing on Omflow? *
    </label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="firsttime" required />
        Yes
      </label>
      <label class="radio">
        <input type="radio" name="firsttime" required />
        No
      </label>
    </div>
  </div>

  <div class="field">
    <label for="" class="label">Medical Preconditions *</label>
    <div class="control">
      <textarea
        required
        class="textarea"
        placeholder="Please list any injuries or conditions that may affect your Omflow group practice. If none, please mark n/a. We strongly recommend a private 1:1 practice in case you are pregnant." />
    </div>
  </div>

  <div class="field">
    <label for="" class="label">
      Would you like to receive personalization through verbal alignment? *
    </label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="alignment" required />
        Yes
      </label>
      <label class="radio">
        <input type="radio" name="alignment" required />
        No
      </label>
    </div>
  </div>

  <div class="field">
    <label for="" class="label">
      Would you like to receive personalization through encouragement? *
    </label>
    <div class="control">
      <label class="radio">
        <input type="radio" name="encouragement" required />
        Yes
      </label>
      <label class="radio">
        <input type="radio" name="encouragement" required />
        No
      </label>
    </div>
  </div>

  <div class="field">
    <label for="" class="label">For safety reasons, please provide an emergency
      contact number including country code. *</label>
    <div class="control">
      <input
        required
        value=""
        class="input"
        type="text"
        placeholder="Emergency Contact" />
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
