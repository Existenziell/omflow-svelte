<script>
  import Header from "../components/Header.svelte";
  import Router from "svelte-spa-router";
  import routes from "../routes";
</script>

<div class="app">
  <div class="container is-fluid">
    <Header />
    <Router {routes} />
  </div>
</div>
