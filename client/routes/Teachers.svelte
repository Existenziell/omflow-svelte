<script>
  import Teacher from "~/components/Teacher.svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { teachers } from "../stores";
</script>

<style>
</style>

<section class="section">
  <h1 class="title is-3">Teachers</h1>
  {#if !$teachers}
    <BarLoader color="#077D84" />
  {:else}
    <div class="teachers">
      {#each $teachers as teacher (teacher._id)}
        <Teacher {...teacher} />
      {/each}
    </div>
  {/if}
</section>
