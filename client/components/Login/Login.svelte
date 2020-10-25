<script>
  import { getContext } from "svelte";
  import Dialog from "./Dialog.svelte";

  const { open } = getContext("simple-modal");

  const onCancel = (text) => {
    name = "";
    status = -1;
  };

  const onOkay = (text) => {
    name = text;
    status = 1;
  };

  const showDialog = () => {
    open(
      Dialog,
      {
        message: "Login to Omflow",
        hasForm: true,
        onCancel,
        onOkay,
      },
      {
        closeButton: true,
        closeOnEsc: true,
        closeOnOuterClick: true,
      }
    );
  };
</script>

<button class="btn btn-sm btn-outline-info" on:click={showDialog}>Login</button>
