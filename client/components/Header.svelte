<script>
  import { isLoggedIn, role } from "../stores";
  import Navigation from "./Navigation.svelte";
</script>

<Navigation {$isLoggedIn} {$role} />
