<script>
  import { onMount } from "svelte";
  import { link } from 'svelte-spa-router'
  import Teacher from "~/routes/Teacher.svelte";
  import TeacherCreate from "~/routes/TeacherCreate.svelte";
  import Loading from "~/components/Loading";

  let loading = false;
  let teachers = [];

  onMount(async () => {
    loading = true;
    const res = await fetch(`${process.env.API_URL}/teachers`);
    teachers = await res.json();
    loading = false;
  });
</script>

<style>
</style>

{#if loading}
  <Loading />
{:else}
  <div class="teachers">
    <h4>All teachers...</h4>
    <div>
      <a href="/teacher-create" use:link component="{TeacherCreate}">Create Teacher</a>
    </div>
    {#each teachers as teacher (teacher._id)}
      <Teacher {...teacher} />
    {/each}
  </div>
{/if}
