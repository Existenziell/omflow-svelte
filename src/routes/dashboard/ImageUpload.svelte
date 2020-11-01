<script>
  import { onMount } from "svelte";

  export const initForm = async () => {
    const imageField = document.getElementById("file");
    const imageContainer = document.getElementById("imageContainer");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");
    const clearImageLink = document.getElementById("clearImage");

    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, preventDragDefault);
    });

    ["dragover", "dragenter"].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, function () {
        imageContainer.classList.add("dragging");
      });
    });

    ["dragleave", "dragend", "drop"].forEach(function (dragEvent) {
      imageContainer.addEventListener(dragEvent, function () {
        imageContainer.classList.remove("dragging");
      });
    });

    imageContainer.addEventListener("drop", function (e) {
      if (e.dataTransfer.files.length > 1) {
        errorMessage.innerHTML = "Drag only one file...";
        errorMessage.classList.remove("hide");
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
    });

    imageField.onchange = function (e) {
      let file = e.target.files[0];

      if (checkFileProperties(file)) {
        handleUploadedFile(file);
      }
    };

    function checkFileProperties(file) {
      errorMessage.classList.add("hide");
      successMessage.classList.add("hide");

      const allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
      ];
      if (file.size > 5000000) {
        errorMessage.innerHTML = "File too large, cannot be more than 5MB";
        errorMessage.classList.remove("hide");
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
      img.setAttribute("id", "imageTag");
      img.file = file;
      imageContainer.appendChild(img);

      let reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
    }

    function clearImage(e) {
      if (e) {
        e.preventDefault();
      }

      let theImageTag = document.querySelector("#imageTag");

      if (theImageTag) {
        imageContainer.removeChild(theImageTag);
        imageField.value = null;
      }
      errorMessage.classList.add("hide");
      successMessage.classList.add("hide");
    }
  };

  onMount(async () => {
    initForm();
  });
</script>

<style>
  .image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  #file {
    display: none;
  }
  #imageContainer {
    height: 300px;
    width: 300px;
    border: 3px dashed darkgrey;
    color: darkgrey;
    background-color: #fafafa;
    font-size: 30px;
    text-align: center;
    vertical-align: middle;
    padding-top: 100px;
    cursor: pointer;
    border-radius: 50%;
    margin-bottom: 25px;
    position: relative;
    overflow: hidden;
  }
  #errorMessage,
  #successMessage {
    font-size: 18px;
    margin-bottom: 25px;
  }
  #errorMessage {
    color: red;
  }
  #successMessage {
    color: green;
  }
  .hide {
    display: none;
  }
</style>

<div class="image-upload">
  <label for="file" id="imageContainer">
    <input type="file" id="file" name="file" accept="image/png, image/jpeg" />
    Click here to upload or
    <b>drag-and-drop</b>
    an image...
  </label>
  <p id="errorMessage" class="hide" />
  <p id="successMessage" class="hide" />
  <a href="/" id="clearImage">Clear</a>
</div>
