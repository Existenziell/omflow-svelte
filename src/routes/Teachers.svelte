<script>
  import { onMount } from "svelte";
  import Teacher from "~/components/Teacher.svelte";

  const fetchTeachers = async () => {
    const res = await fetch(`${process.env.API_URL}/teachers`);
    const teachers = await res.json();
    if (res.ok) {
      return teachers;
    } else {
      throw new Error(teachers);
    }
  };
  const teachers = fetchTeachers();
  const data = { amount: 1234 };
  onMount(async () => {});
</script>

<style>
</style>

<div class="container is-fluid">
  <section class="section">
    <h1 class="title is-3">Teachers</h1>
    {#await teachers}
      <p>Fetching...</p>
    {:then teachers}
      <div class="teachers">
        {#each teachers as teacher (teacher._id)}
          <Teacher {...teacher} {data} />
        {/each}
      </div>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </section>
</div>
