<script>
  import { afterUpdate } from "svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { classes } from "../stores";
  import { link } from "svelte-spa-router";
  import moment from "moment";

  let loading = true;

  afterUpdate(async () => {
    if ($classes) {
      loading = false;
    }
  });
</script>

<section class="section">
  <h1 class="title is-3">All Classes</h1>
  {#if loading}
    <BarLoader color="#077D84" />
  {:else}
    <div class="columns">
      {#each $classes as c}
        <div class="column">
          <div class="card p-5 mb-4">
            <h2 class="title is-5">
              <a href="/class/{c._id}" use:link>
                {c.level.identifier}
                {c.style.identifier}
              </a>
            </h2>
            <p>{c.duration} min</p>
            <p>{c.teacher.name}</p>
            <p class="is-size-3">{c.price} $</p>
            <p>{moment(c.date).format('MM/DD/YYYY')}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>
