<script lang="ts">
  import { NutritionInfo } from "../models/NutritionsInfo";
  import { postReports, ReportType } from "../utils/requests/postReport";
  import { userStore } from "../stores/userStore";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  import Scrollable from "./Scrollable.svelte";

  let weight = 0;
  let steps = 0;
  let formData: NutritionInfo = {
    ccal: 0,
    protein: 0,
    fat: 0,
    c: 0,
  };

  let isLoading = false;

  async function submitData() {
    isLoading = true;
    const userId = $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID;

    await postReports(
      userId,
      ReportType.WEIGHT,
      JSON.stringify({ weight: weight })
    );
    await postReports(
      userId,
      ReportType.STEPS,
      JSON.stringify({ steps: steps })
    );
    await postReports(
      userId,
      ReportType.CCAL,
      JSON.stringify({ Value: JSON.stringify(formData) })
    );

    isLoading = false;
  }
</script>

<Scrollable>
  <div>
    {#if isLoading}
      <div class="loading-indicator">
        <CircularProgressIndicator />
      </div>
    {:else}
      <label for="weight">Вес:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="weight"
        bind:value={weight}
      />

      <label for="steps">Шаги:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="steps"
        bind:value={steps}
      />
      <label for="ccal">Ккал:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="ccal"
        bind:value={formData.ccal}
      />

      <label for="protein">Белки:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="protein"
        bind:value={formData.protein}
      />

      <label for="fat">Жиры:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="fat"
        bind:value={formData.fat}
      />

      <label for="c">Углеводы:</label>
      <input
        class="dark secondary-container on-secondary-container"
        type="number"
        id="c"
        bind:value={formData.c}
      />

      <button class="my-button" on:click={submitData}>Отправить</button>
    {/if}
  </div>
</Scrollable>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
  }

  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; /* Высота индикатора загрузки */
  }

  label {
    margin-bottom: 5px;
    text-align: left; /* Прижимаем заголовки к левому краю */
  }

  input {
    margin-bottom: 10px;
  }

  .my-button {
    margin-top: 10px;
  }
</style>
