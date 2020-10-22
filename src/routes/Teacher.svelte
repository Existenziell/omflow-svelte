<script>
  export let params = {}
  export let name, description, image, tag;

</script>

<style>
</style>

<div class="teacher">
  <h4>{name}</h4>
  <p>{description}</p>
  <img src="{process.env.API_URL}/{image}" alt={tag} />
</div>
