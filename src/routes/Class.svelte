<script>
  import { afterUpdate, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { BarLoader } from "svelte-loading-spinners";
  import { classes } from "../stores";
  import { link } from "svelte-spa-router";
  import moment from "moment";

  export let params;
  let loading = true;
  let practice = {};

  afterUpdate(async () => {
    if ($classes) {
      practice = $classes.filter((c) => c._id === params.id)[0];
      loading = false;
    }
  });
</script>

<section class="section">
  {#if loading}
    <BarLoader color="#077D84" />
  {:else}
    <div class="card p-5">
      <h2 class="title is-5">
        {practice.level.identifier}
        {practice.style.identifier}
      </h2>
      <p>{practice.duration} min</p>
      <p>{practice.teacher.name}</p>
      <p class="is-size-3">{practice.price} $</p>
      <p>{moment(practice.date).format('MM/DD/YYYY')}</p>
      <a href="/signup/{practice._id}" class="button is-primary mt-6" use:link>
        Signup
      </a>
    </div>
  {/if}
</section>
