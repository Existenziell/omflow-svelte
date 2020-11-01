<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { currentUser, teachers } from "../../stores";
  import { link } from "svelte-spa-router";
  import ImageUpload from "./ImageUpload.svelte";
  import { log } from "console";

  let API_URL = process.env.API_URL;

  let name, bio, address, quote, instagram, pose, styles, levels, coordinates;
  let allStyles = [];
  let allLevels = [];

  let message = "";

  const submitForm = async () => {
    const file = document.querySelector("#file");
    const image = file.files[0];
    const tag = name.replace(/\s/g, "").toLowerCase();
    let coords = coordinates.split(",");
    coords = coords.map((c) => parseFloat(c.trim()));

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tag", tag);
    formData.append("styles", JSON.stringify(styles));
    formData.append("levels", JSON.stringify(levels));
    formData.append("coordinates", JSON.stringify(coords));
    formData.append("description", bio);
    formData.append("address", address);
    formData.append("quote", quote);
    formData.append("instagram", instagram);
    formData.append("pose", pose);
    formData.append("file", image);

    const response = await fetch(`${API_URL}/teachers/create/`, {
      method: "POST",
      body: formData,
      headers: { "x-auth-token": $currentUser.token },
    });
    const result = await response.json();

    if (response) {
      message = response.data;
      displayServerMsg(response.data);

      // ToDo: Update store...
      $teachers = [...$teachers, result];
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
    const lvls = await fetch(`${API_URL}/practices/levels`);
    allLevels = await lvls.json();
    const styls = await fetch(`${API_URL}/practices/styles`);
    allStyles = await styls.json();
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

    <div class="field">
      <label for="" class="label">Name:</label>
      <div class="control">
        <input
          bind:value={name}
          class="input"
          type="text"
          placeholder="Teachers name"
          required />
      </div>
    </div>

    <div class="is-flex mt-5">
      <div class="field">
        <label for="" class="label">Styles:</label>
        <div class="select is-multiple mr-5">
          <select multiple bind:value={styles} size="5" required>
            {#each allStyles as style (style._id)}
              <option value={style._id}>{style.identifier}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Levels:</label>
        <div class="select is-multiple">
          <select multiple bind:value={levels} size="5" required>
            {#each allLevels as level (level._id)}
              <option value={level._id}>{level.identifier}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <div class="field mt-5">
      <label for="" class="label">Location/Address:</label>
      <div class="control">
        <input
          bind:value={address}
          class="input"
          type="text"
          placeholder="City, Country" />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Coordinates (Latitude/Longitude):</label>
      <div class="control">
        <input
          bind:value={coordinates}
          class="input"
          type="text"
          placeholder="Format: 15.3421, -13.34323 (https://www.latlong.net/)"
          required />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Bio:</label>
      <div class="control">
        <textarea
          bind:value={bio}
          class="textarea"
          placeholder="Some more details" />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Quote/Testimonial</label>
      <div class="control">
        <input
          bind:value={quote}
          class="input"
          type="text"
          placeholder="What do others say about this teacher" />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Instagram</label>
      <div class="control">
        <input
          bind:value={instagram}
          class="input"
          type="text"
          placeholder="Instagram user name without @" />
      </div>
    </div>

    <div class="field">
      <label for="" class="label">Preferred Pose:</label>
      <div class="control">
        <input
          bind:value={pose}
          class="input"
          type="text"
          placeholder="Asana name" />
      </div>
    </div>

    <div class="field is-grouped mt-6">
      <p class="server-msg">{message}</p>

      <div class="control">
        <input type="submit" class="button is-primary" value="Save" />
      </div>
      <div class="control">
        <a href="/dashboard" class="button" use:link>Cancel</a>
      </div>
    </div>
  </form>
</section>
