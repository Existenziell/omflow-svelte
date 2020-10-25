<script>
  import { onMount } from "svelte";
  import Teacher from "~/components/Teacher.svelte";
  import { BarLoader } from "svelte-loading-spinners";

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
</script>

<style>
</style>

<section class="section">
  <h1 class="title is-3">Teachers</h1>
  {#await teachers}
    <BarLoader color="#077D84" />
  {:then teachers}
    <div class="teachers">
      {#each teachers as teacher (teacher._id)}
        <Teacher {...teacher} />
      {/each}
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</section>
