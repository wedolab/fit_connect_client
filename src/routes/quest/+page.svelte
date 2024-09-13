<script lang="ts">
  import "../../app.css";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import ErrorRetry from "../../components/ErrorRetry.svelte";
  import Quest from "../../components/Quest.svelte";

  let isLoading = false;

  let err: any | undefined | null;

  async function onSendQuest(params: any) {
    isLoading = true;

    isLoading = false;
  }
</script>

<div>
  {#if !isLoading}
    {#if err != null || undefined}
      <div class="spacer" />
      <ErrorRetry {err} onRetry={() => {}} errTitle={null} />
      <div class="spacer" />
    {:else}
      <div class="spacer" />
      <h2>Анкета</h2>
      <div class="space" />
      <Quest onClick={onSendQuest} />
      <div class="spacer" />
    {/if}
  {:else}
    <div class="loading-indicator">
      <CircularProgressIndicator />
    </div>
  {/if}
</div>

<style scoped>
  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; /* Высота индикатора загрузки */
  }
  h2 {
    text-align: center;
  }
  .spacer {
    height: 20vh;
  }
  .space {
    height: 40px;
  }
</style>
