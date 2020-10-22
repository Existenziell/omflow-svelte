<script>
  import Loading from "~/components/Loading.svelte";
  import { onMount } from "svelte";

  let API_URL = process.env.API_URL;
  let allStyles = [];
  let allLevels = [];
  let res = '';
  let loading = false;

  onMount(async () => {
    loading = true;
    res = await fetch(`${API_URL}/practices/levels`);
    allLevels = await res.json();
    res = await fetch(`${API_URL}/practices/styles`);
    allStyles = await res.json();
    loading = false;

    const imageField = document.getElementById('file');
    const imageContainer = document.getElementById('imageContainer');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const clearImageLink = document.getElementById('clearImage');

    [
      'drag',
      'dragstart',
      'dragend',
      'dragover',
      'dragenter',
      'dragleave',
      'drop'
    ].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, preventDragDefault);
    });

    ['dragover', 'dragenter'].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, function () {
        imageContainer.classList.add('dragging');
      })
    });

    ['dragleave', 'dragend', 'drop'].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, function () {
        imageContainer.classList.remove('dragging');
      })
    });

    imageContainer.addEventListener('drop', function (e) {
      if (e.dataTransfer.files.length > 1) {
        errorMessage.innerHTML = "Drag only one file...";
        errorMessage.classList.remove('hide');
        return false;
      }

      // Casting fileList to Array before assigning
      const fileList = Array.from(e.dataTransfer.files);
      const file = fileList[0];
      const imageFieldFiles = Array.from(imageField.files);
      imageFieldFiles[0] = file;

      if (checkFileProperties(file)) {
        handleUploadedFile(file);
      }
    })

    imageField.onchange = function (e) {
      let file = e.target.files[0];

      if (checkFileProperties(file)) {
        handleUploadedFile(file);
      }
    }

    function checkFileProperties(file) {
      errorMessage.classList.add('hide');
      successMessage.classList.add('hide');

      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
      if (file.size > 5000000) {
        errorMessage.innerHTML = "File too large, cannot be more than 5MB";
        errorMessage.classList.remove('hide');
        return false;
      }
      return true;
    }

    if (clearImageLink) {
      clearImageLink.onclick = clearImage;
    }

    function preventDragDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function handleUploadedFile(file) {
      clearImage();
      const img = document.createElement("img");
      img.setAttribute('id', 'imageTag');
      img.file = file;
      imageContainer.appendChild(img);

      let reader = new FileReader();
      reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }

    function clearImage(e) {
      if (e) {
        e.preventDefault();
      }

      let theImageTag = document.querySelector('#imageTag');

      if (theImageTag) {
        imageContainer.removeChild(theImageTag);
        imageField.value = null;
      }

      errorMessage.classList.add('hide');
      successMessage.classList.add('hide');
    }
  });
</script>

<style>
</style>

{#if loading}
  <Loading />
{/if}

<div class="admin-create-teacher">
  <h3>Create Teacher</h3>

  <form id="admin-create-teacher" action="{API_URL}/teachers/create/" method="POST">

    <div class="image-upload">
      <label for="file" id="imageContainer">
        <input type="file" id="file" name="file" accept="image/png, image/jpeg">
        Click here to upload or <b>drag-and-drop</b> an image...
      </label>
      <p id="errorMessage" class="hide"></p>
      <p id="successMessage" class="hide"></p>
      <a href="/" id="clearImage">Clear</a>
    </div>

    <div class="form-group">
      <label for="">Name:</label>
      <input type="text" class="form-control teacher-name" required />
    </div>
    <div class="form-group">
      <label for="">Description:</label>
      <textarea class="form-control teacher-description"></textarea>
    </div>

    <div class="form-group">
      <label for="teacher-styles">Styles:</label>
      <select multiple class="form-control" id="teacher-styles">
        {#each allStyles as style (style._id)}
          <option value="{style._id}">{style.identifier}</option>
        {/each}
      </select>
    </div>

    <div class="form-group">
      <label for="teacher-levels">Levels:</label>
      <select multiple class="form-control" id="teacher-levels">
        {#each allLevels as level (level._id)}
          <option value="{level._id}">{level.identifier}</option>
        {/each}
      </select>
    </div>

    <div class="form-group">
      <label for="">Location/Address:</label>
      <input type="text" class="form-control teacher-address" />
    </div>
    <div class="form-group">
      <label for="">Coordinates (Longitude):</label>
      <input type="number" class="form-control teacher-coordinates" required />
    </div>
    <div class="form-group">
      <label for="">Coordinates (Latitude):</label>
      <input type="number" class="form-control teacher-coordinates" required />
    </div>
    <div class="form-group">
      <label for="">Quote:</label>
      <input type="text" class="form-control teacher-quote" />
    </div>
    <div class="form-group">
      <label for="">Instagram:</label>
      <input type="text" class="form-control teacher-instagram" />
    </div>
    <div class="form-group">
      <label for="">Preferred pose:</label>
      <input type="text" class="form-control teacher-pose" />
    </div>

    <div class="form-group">
      <p class="server-msg"></p>
      <input type="submit" id="admin-save-teacher" class="btn btn-sm btn-outline-info" value="Save" />
      <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
    </div>

  </form>
</div>
