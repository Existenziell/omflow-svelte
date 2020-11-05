<script>
  import { currentSignupStep } from "../../stores";
  import { fly } from "svelte/transition";
  import moment from "moment";

  export let practice, nextStep;
</script>

<div in:fly={{ x: -400, duration: 400 }}>
  <span class="indicator mb-2">1</span>
  <span class="title is-5 ml-3">You chose the following practice:</span>

  <div class="card p-6 mt-2">
    <h1 class="title is-3">
      {practice.level.identifier}
      {practice.style.identifier}
    </h1>
    <h2>with {practice.teacher.name}</h2>
    <p>{practice.duration} min</p>
    <p class="is-size-3">{practice.price} $</p>
    <p>{moment(practice.date).format('MM/DD/YYYY')}</p>

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
