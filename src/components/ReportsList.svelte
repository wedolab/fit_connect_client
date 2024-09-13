<script lang="ts">
  import { onMount } from "svelte";
  import { reportsStore } from "../stores/reportsStore";
  import Scrollable from "./Scrollable.svelte";
  import { getReports } from "../utils/requests/getReports";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  import { userStore } from "../stores/userStore";
  import ErrorRetry from "./ErrorRetry.svelte";

  let isLoading: boolean = true;
  let err: any | undefined | null;

  onMount(async () => {
    await getReports($userStore.id ?? import.meta.env.VITE_TELEGRAM_ID)
      .then((e) => reportsStore.set(e))
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });

    isLoading = false;
  });

  let groupedData = [];

  for (let i = 0; i < $reportsStore.length; i += 3) {
    groupedData.push(
      $reportsStore.slice(i, i + 3).map((item) => {
        let value = item.value;
        if (value.Value) {
          try {
            value = JSON.parse(
              value.Value.replace(/([a-zA-Z0-9_-]+):/g, '"$1":')
            );
          } catch (error) {
            console.error("Error parsing value field:", error);
          }
        }
        return value;
      })
    );
  }
</script>

<Scrollable>
  {#if !isLoading}
    {#if err != null || undefined}
      <div class="spacer" />
      <div>
        <ErrorRetry {err} onRetry={() => {}} errTitle={null} />
      </div>
      <div class="spacer" />
    {:else}
      {#each groupedData as group, index}
        <div class="group">
          <p class="report-header">Отчет {index + 1}:</p>
          {#each group as item}
            <div>
              {#if item.steps >= 0}
                Шаги: {item.steps}
              {/if}
              {#if item.weight >= 0}
                Вес: {item.weight} /
              {/if}
            </div>
            <div>
              {#if item.ccal >= 0}
                Ккал: {item.ccal} /
              {/if}
              {#if item.protein >= 0}
                Белки: {item.protein}
              {/if}
            </div>
            <div>
              {#if item.fat >= 0}
                Жиры: {item.fat} /
              {/if}
              {#if item.c >= 0}
                Углеводы: {item.c}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  {:else}
    <div class="spacer" />
    <CircularProgressIndicator />
    <div class="spacer" />
  {/if}
</Scrollable>

<style>
  .group {
    padding: 10px;
    margin-bottom: 10px;
  }

  .report-header {
    text-align: center;
  }
</style>
