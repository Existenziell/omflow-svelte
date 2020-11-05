<script>
  import { currentUser } from "../stores";

  let name = "to Omflow :)";
  if ($currentUser) {
    name = $currentUser.name;
  }
</script>

<section class="section">
  <h1 class="title is-3">Welcome {name}</h1>
</section>
