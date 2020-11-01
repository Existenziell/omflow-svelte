<script>
  import { currentUser } from "../../stores";
  import LayoutPublic from "./_LayoutPublic";
  import LayoutTeacher from "./_LayoutTeacher";
  import LayoutAdmin from "./_LayoutAdmin";
</script>

<section class="section">
  <h1 class="title is-3">Dashboard</h1>
  {#if $currentUser.role === 'admin'}
    <LayoutAdmin />
  {:else if $currentUser.role === 'teacher'}
    <LayoutTeacher />
  {:else}
    <LayoutPublic />
  {/if}
</section>
