<script>
  import Teacher from "~/components/Teacher.svelte";
  import Loading from "~/components/Loading.svelte";
  import { onMount } from "svelte";

  // import { teachers, sortedTeachers } from "./stores";

  // A component prop
  export let appName;
  let loading = false;
  let teachers = [];

  onMount(async () => {
    loading = true;
    const res = await fetch(`http://localhost:5000/teachers`);
    teachers = await res.json();
    loading = false;
  });
</script>

<style>
</style>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class="appRoot">
  <h1>Teachers</h1>
  {#if loading}
    <Loading />
  {/if}

  {#if teachers.length == 0}
    <div class="notification">Add your first teacher</div>
  {/if}

  {#each teachers as teacher (teacher._id)}
    <Teacher {...teacher} />
  {/each}
</div>
