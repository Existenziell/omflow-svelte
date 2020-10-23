<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let params;
  let teacher;
  let visible = false;
  onMount(async () => {
    teacher = await (
      await fetch(`${process.env.API_URL}/teachers/byTagName/${params.id}`)
    ).json();
    visible = true;
  });
</script>

<style>
</style>

{#if visible}
  <div class="container is-fluid">
    <section class="section">
      <h1 class="title is-3">{teacher.name}</h1>
      <p>{teacher.description}</p>
      <p>{teacher.quote}</p>
      <img
        src="{process.env.API_URL}/{teacher.image}"
        alt={teacher.tag}
        transition:fade />
    </section>
  </div>
{/if}
