<script>
  import { beforeUpdate, onMount } from "svelte";
  import { teachers, classes, currentUser } from "../../stores";
  import { link } from "svelte-spa-router";
  import moment from "moment";
  import "moment-timezone";
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    background-color: rgba(10, 10, 10, 0.5);
  }
  .user-info {
    font-size: 12px;
    color: white;
  }
</style>

<div class="header">
  <div class="logo" />
  <section class="user-info">
    <p>
      {$currentUser.name}<br />
      {$currentUser.email}<br />
      {moment.tz.guess()}
    </p>
  </section>
</div>
