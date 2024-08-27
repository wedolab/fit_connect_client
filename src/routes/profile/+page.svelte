<script lang="ts">
  import "../../app.css";
  import BottomNavBar from "../../components/BottomNavBar.svelte";
</script>

<BottomNavBar activeIndex={1}>
  <div class="container">
    <h1>Profile</h1>
    <div class="spacer" />
    <button class="my-button">Login with Google</button>
    <div class="spacer" />
  </div>
</BottomNavBar>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    margin-top: 20px; /* Отступ сверху 20px */
  }
</style>
