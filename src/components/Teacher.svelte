<script>
  import { link } from "svelte-spa-router";
  import Teacher from "~/components/Teacher.svelte";
  export let _id, name, description, image, tag, quote, instagram;
</script>

<style>
</style>

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="{process.env.API_URL}/{image}" alt={tag} />
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{name}</strong>
          <small>{instagram}</small>
          <br />
          {description}
        </p>
      </div>

      <a href="/teacher/{tag}" use:link component={Teacher}> Details </a>
    </div>
  </article>
</div>
