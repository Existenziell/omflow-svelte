<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let params;
  let promise = getTeacher();

  async function getTeacher() {
    const res = await fetch(
      `${process.env.API_URL}/teachers/byTagName/${params.id}`
    );
    const teacher = await res.json();
    return teacher;
  }
</script>

<style>
</style>

{#await promise}
  Loading...
{:then teacher}
  <section class="section">
    <h1 class="title is-3">{teacher.name}</h1>
    <p>{teacher.description}</p>
    <p>{teacher.quote}</p>
    <img
      src="{process.env.API_URL}/{teacher.image}"
      alt={teacher.tag}
      transition:fade />
  </section>
{:catch error}
  Error
{/await}
