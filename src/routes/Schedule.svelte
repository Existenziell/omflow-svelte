<script>
  import Datepicker from "../components/Datepicker/Datepicker.svelte";

  let dateFormat = "#{l}, #{F} #{j}, #{Y}";
</script>

<section class="section">
  <h1 class="title is-3">Schedule</h1>

  <!-- https://github.com/6eDesign/svelte-calendar/ -->
  <Datepicker
    format={dateFormat}
    buttonBackgroundColor="#e20074"
    buttonTextColor="white"
    highlightColor="#e20074"
    dayBackgroundColor="#efefef"
    dayTextColor="#333"
    dayHighlightedBackgroundColor="#e20074"
    dayHighlightedTextColor="#fff" />
</section>
