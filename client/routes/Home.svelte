<script>
  import { currentUser } from "../stores";

  let name = "to Omflow :)";
  if ($currentUser) {
    name = $currentUser.user.name;
  }
</script>

<div class="container is-fluid">
  <section class="section">
    <h1 class="title is-3">Welcome {name}</h1>
    <!-- {JSON.stringify($currentUser)} -->
  </section>
</div>
