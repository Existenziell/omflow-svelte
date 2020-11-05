<script>
  import { teachers } from "../../stores";
  import { BarLoader } from "svelte-loading-spinners";
  import Login from "../User/Login.svelte";
  import Modal from "../User/Modal.svelte";
</script>

<div class="intro">
  <div class="logo" />

  {#if !$teachers}
    <BarLoader color="#077D84" />
  {:else}
    <div class="buttons">
      <Modal>
        <Login type="is-primary" />
      </Modal>
      <button class="button is-secondary">Practice Now</button>
      <button class="button is-light">Learn more</button>
    </div>

    {#each $teachers as teacher (teacher._id)}
      <div class="bubble">
        <img src="{process.env.API_URL}/{teacher.image}" alt={teacher.tag} />
      </div>
    {/each}
  {/if}
</div>
