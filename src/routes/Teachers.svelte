<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import Teacher from "~/components/Teacher.svelte";
  import TeacherCreate from "~/routes/TeacherCreate.svelte";

  let teachers = [];

  onMount(async () => {
    const res = await fetch(`${process.env.API_URL}/teachers`);
    teachers = await res.json();
  });
</script>

<style>
</style>

<div class="container is-fluid">
  <section class="section">
    <h1 class="title is-3">Teachers</h1>
    <div class="teachers">
      <div>
        <a href="/teacher-create" use:link component={TeacherCreate}>Create
          Teacher</a>
      </div>
      {#each teachers as teacher (teacher._id)}
        <Teacher {...teacher} />
      {/each}
    </div>
  </section>
</div>
