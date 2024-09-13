<script lang="ts">
  import "../../app.css";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import Quest from "../../components/Quest.svelte";

  let isLoading = false;
</script>

<div class="container">
  {#if !isLoading}
    <h2>Анкета</h2>
    <div class="center">
      <Quest navigate={"/home"} />
    </div>
  {:else}
    <div class="center">
      <CircularProgressIndicator />
    </div>
  {/if}
</div>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    height: 90vh;
    margin-top: 20px; /* Отступ сверху 20px */
  }
  h2 {
    text-align: center;
  }
</style>
