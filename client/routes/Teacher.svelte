<script>
  import { fade } from "svelte/transition";
  import { BarLoader } from "svelte-loading-spinners";

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

<section class="section">
  {#await promise}
    <BarLoader color="#077D84" />
  {:then teacher}
    <h1 class="title is-3">{teacher.name}</h1>
    <p>{teacher.description}</p>
    <p>{teacher.quote}</p>
    <img
      src="{process.env.API_URL}/{teacher.image}"
      alt={teacher.tag}
      in:fade />
  {:catch error}
    Error
  {/await}
</section>
