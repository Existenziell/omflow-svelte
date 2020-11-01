<script>
  import { beforeUpdate, onMount } from "svelte";
  import { teachers, classes, currentUser } from "../../stores";
  import { link } from "svelte-spa-router";
  import { BarLoader } from "svelte-loading-spinners";
  import moment from "moment";

  $: $teachers;
  $: $classes;

  let users;
  let loading = true;

  // Holds table sort state. Initialized to reflect table sorted by id column ascending.
  let sortBy = { col: "name", ascending: true };

  $: sort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
    }

    // Modifier to sorting function for ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1;

    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
        ? 1 * sortModifier
        : 0;

    $teachers = $teachers.sort(sort);
    $classes = $classes.sort(sort);
    users = users.sort(sort);
  };

  onMount(async () => {
    const res = await fetch(`${process.env.API_URL}/users/all`, {
      headers: { "x-auth-token": $currentUser.token },
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
  th:hover {
    cursor: pointer;
  }
  img {
    width: 50px;
  }
</style>

{#if loading}
  <BarLoader color="#077D84" size="74" unit="px" />
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
              <th>Image</th>
              <th on:click={sort('name')}>Name</th>
              <th on:click={sort('practices')}>#Classes</th>
              <th on:click={sort('quote')}>Quote</th>
              <th on:click={sort('address')}>Location</th>
              <th on:click={sort('pose')}>Pose</th>
              <th on:click={sort('createdAt')}>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {#each teachers as t}
              <tr>
                <td>
                  <img src="{process.env.API_URL}/{t.image}" alt={t.tag} />
                </td>
                <td>{t.name}</td>
                <td>{t.practices.length}</td>
                <td>{t.quote.substring(0, 40)} ...</td>
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
              <th on:click={sort('price')}>Price</th>
              <th on:click={sort('duration')}>Duration</th>
              <th on:click={sort('date')}>Date</th>
              <th>Recurring?</th>
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
                <td>{c.recurring}</td>
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
              <th on:click={sort('name')}>Name</th>
              <th on:click={sort('email')}>Email</th>
              <th on:click={sort('verified')}>Verified</th>
              <th on:click={sort('role')}>Role</th>
              <th on:click={sort('createdAt')}>Created</th>
              <th on:click={sort('location')}>Location</th>
            </tr>
          </thead>
          <tbody>
            {#each users as user}
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isVerified}</td>
                <td>{user.role}</td>
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
