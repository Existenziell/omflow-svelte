<script>
  import { link } from "svelte-spa-router";
  import Teacher from "../components/Teacher.svelte";
  export let name, description, image, tag, quote, instagram;
</script>

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
      <p>{quote}</p>
    </div>

    <a
      href="/teacher/{tag}"
      class="button is-small is-primary"
      use:link
      component={Teacher}>
      Details
    </a>
  </div>
</article>
