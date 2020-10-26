<script>
  import { beforeUpdate, onMount } from "svelte";
  import { teachers, classes, token } from "../../stores";
  import { link } from "svelte-spa-router";
  import { BarLoader } from "svelte-loading-spinners";
  import moment from "moment";

  $: $teachers;
  $: $classes;

  let loading = true;
  let users;

  onMount(async () => {
    const res = await fetch(`${process.env.API_URL}/users/all`, {
      headers: { "x-auth-token": $token },
    });
    users = await res.json();
  });

  beforeUpdate(async () => {
    if ($teachers && $classes && users) {
      loading = false;
    }
  });
</script>

<style>
  .level-right {
    margin-top: -30px;
    margin-bottom: 30px;
  }
</style>

{#if loading}
  <BarLoader color="#077D84" size="150" unit="px" />
{:else}
  <section class="section">
    <h2 class="title is-5">Teachers</h2>
    <div class="card p-5 mb-4">
      <p>Number of Omies: {$teachers.length}</p>
      <div class="level-right">
        <a href="/teacher-create" use:link class="button is-small">
          Create Teacher
        </a>
      </div>

      {#await $teachers then teachers}
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>#Classes</th>
              <th>Image</th>
              <th>Location</th>
              <th>Pose</th>
              <th>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {#each teachers as t}
              <tr>
                <td>{t.name}</td>
                <td>{t.practices.length}</td>
                <td>{t.image}</td>
                <td>{t.address}</td>
                <td>{t.pose}</td>
                <td>{moment(t.createdAt, 'YYYYMMDD').fromNow()}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:catch error}
        {error}
      {/await}
    </div>

    <h2 class="title is-5">Classes</h2>
    <div class="card p-5 mb-4">
      <p>Number of Classes: {$classes.length}</p>
      <div class="level-right">
        <a href="/class-create" use:link class="button is-small">
          Create Class
        </a>
      </div>

      {#await $classes then classes}
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Level</th>
              <th>Style</th>
              <th>Teacher</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {#each classes as c}
              <tr>
                <td>{c.level.identifier}</td>
                <td>{c.style.identifier}</td>
                <td>{c.teacher.name}</td>
                <td>{c.price} $</td>
                <td>{c.duration} min</td>
                <td>{moment(c.date).format('MM/DD/YYYY')}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:catch error}
        {error}
      {/await}
    </div>

    <h2 class="title is-5">Users</h2>
    <div class="card p-5 mb-4">
      <p>Number of Omflowers: {users.length}</p>
      <div class="level-right">
        <a href="/promote" use:link class="button is-small"> Promote User </a>
      </div>

      {#await users then users}
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Role</th>
              <th>Created</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {#each users as user}
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isVerified}</td>
                <td>{user.role.name}</td>
                <td>{moment(user.createdAt, 'YYYYMMDD').fromNow()}</td>
                <td>{user.location}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:catch error}
        {error}
      {/await}
    </div>
  </section>
{/if}
