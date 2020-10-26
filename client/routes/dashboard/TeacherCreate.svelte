<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { token } from "../../stores";
  import { link } from "svelte-spa-router";
  import ImageUpload from "./ImageUpload.svelte";

  let API_URL = process.env.API_URL;
  let allStyles = [];
  let allLevels = [];
  let res = "";

  let name,
    description,
    address,
    quote,
    instagram,
    pose,
    tag,
    styles,
    levels,
    coordinatesX,
    coordinatesY;

  let message = "";

  const submitForm = async () => {
    const file = document.querySelector("#file");
    const image = file.files[0];
    const coordinates = JSON.stringify([coordinatesX, coordinatesY]);
    const tag = name.replace(/\s/g, "").toLowerCase();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tag", tag);
    formData.append("styles", JSON.stringify(styles));
    formData.append("levels", JSON.stringify(levels));
    formData.append("coordinates", coordinates);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("quote", quote);
    formData.append("instagram", instagram);
    formData.append("pose", pose);
    formData.append("file", image);

    const response = await fetch(`${API_URL}/teachers/create/`, {
      method: "POST",
      body: formData,
      headers: { "x-auth-token": $token },
    });
    const result = await response.json();

    if (response) {
      message = response.data;
      displayServerMsg(response.data);
      push("/dashboard");
    }
  };

  const displayServerMsg = (msg, isError) => {
    const target = document.querySelector(".server-msg");
    target.style.display = "block";
    if (isError) target.classList.add("server-msg-error");
    target.innerHTML = msg;
  };

  onMount(async () => {
    res = await fetch(`${API_URL}/practices/levels`);
    allLevels = await res.json();
    res = await fetch(`${API_URL}/practices/styles`);
    allStyles = await res.json();
  });
</script>

<style>
  .section {
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  form {
    width: 60%;
  }
</style>

<section class="section">
  <h1 class="title is-3">Create a new Teacher</h1>
  <form on:submit|preventDefault={submitForm} class="card p-5">
    <ImageUpload />

    <div class="form-group">
      <label for="">Name:</label>
      <input bind:value={name} type="text" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="">Description:</label>
      <textarea bind:value={description} class="form-control" />
    </div>

    <div class="form-group">
      <label for="teacher-styles">Styles:</label>
      <select bind:value={styles} multiple class="form-control">
        {#each allStyles as style (style._id)}
          <option value={style._id}>{style.identifier}</option>
        {/each}
      </select>
    </div>

    <div class="form-group">
      <label for="teacher-levels">Levels:</label>
      <select bind:value={levels} multiple class="form-control">
        {#each allLevels as level (level._id)}
          <option value={level._id}>{level.identifier}</option>
        {/each}
      </select>
    </div>

    <div class="form-group">
      <label for="">Location/Address:</label>
      <input bind:value={address} type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="">Coordinates (Longitude):</label>
      <input
        bind:value={coordinatesX}
        type="number"
        class="form-control"
        required />
    </div>
    <div class="form-group">
      <label for="">Coordinates (Latitude):</label>
      <input
        bind:value={coordinatesY}
        type="number"
        class="form-control"
        required />
    </div>
    <div class="form-group">
      <label for="">Quote:</label>
      <input bind:value={quote} type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="">Instagram:</label>
      <input bind:value={instagram} type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="">Preferred pose:</label>
      <input bind:value={pose} type="text" class="form-control" />
    </div>

    <div class="form-group">
      <p class="server-msg">{message}</p>
      <input type="submit" class="btn btn-outline-info" value="Save" />
      <a href="/dashboard" class="btn btn-outline-secondary" use:link>Cancel</a>
    </div>
  </form>
</section>
