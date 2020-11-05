<script>
  import { currentSignupStep } from "../../stores";
  import { fly } from "svelte/transition";

  export let nextStep;
</script>

<style>
  p {
    font-weight: bold;
  }
  .required {
    color: salmon;
  }
  .field {
    margin-bottom: 30px;
  }
</style>

<div in:fly={{ x: -400, duration: 400 }}>
  <span class="indicator mb-5">4</span>
  <span class="title is-5 ml-3">Omflow Policy</span>

  <div class="field">
    <p>
      Omflow does not offer refunds for student cancelled practices but offers
      reschedules up to 10 hours before the practice. No shows are considered
      cancellations and payment will be forfeited.
    </p>
    <label class="checkbox">
      <input type="checkbox" required />
      I have read and agree to the terms above.
      <span class="required">*</span>
    </label>
  </div>

  <div class="field">
    <label for="" class="label">Should an Omflow Practice need to be rescheduled
      with less than 24 hours notice, two options are offered. Which option
      would you like for this practice?
      <span class="required">*</span>
    </label>
    <div class="control">
      <label>
        <input type="radio" name="reschedule" class="mr-1" required />Reschedule
        for a future practice with this teacher and receive 50% off your next
        practice
      </label><br />
      <label>
        <input type="radio" name="reschedule" class="mr-1" required />Attend the
        selected practice with a substitute teacher if possible
      </label>
    </div>
  </div>

  <div class="field">
    <p>
      I understand that yoga includes movement of the physical body and risks of
      injuries that may result in personal injury and/or death may be present. I
      assume full responsibility and release Omflow from all liabilities.
    </p>
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" required />
        I have read and agree to the terms above.
        <span class="required">*</span>
      </label>
    </div>
  </div>

  <div class="field">
    <p>
      I understand that my participation in this practice may be recorded and
      grant permission to Omflow.
      <span class="required">*</span>
    </p>
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" required />
        To review for quality safety or training purposes
      </label>
      <label class="checkbox">
        <input type="checkbox" required />
        For marketing purposes understanding that it will not be misused or sold
        to a third party
      </label>
    </div>
  </div>

  <div class="field">
    <p>Full Terms & Conditions:</p>
    <a
      href="https://app.termly.io/document/terms-of-use-for-website/4c5e1346-617a-4cf0-8668-bd2a6f785a7a">
      https://app.termly.io/document/terms-of-use-for-website/4c5e1346-617a-4cf0-8668-bd2a6f785a7a
    </a>
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" required />
        I have read and agree to the full terms and conditions.
        <span class="required">*</span>
      </label>
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
