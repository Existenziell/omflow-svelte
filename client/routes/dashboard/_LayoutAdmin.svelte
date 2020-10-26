<script>
  import { link } from "svelte-spa-router";
  import { token, isLoggedIn, role, currentUser } from "../../stores";
</script>

<section>Admin</section>
<div><a href="/teacher-create" use:link> Create Teacher </a></div>
