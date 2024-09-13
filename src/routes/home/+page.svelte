<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import { getReports } from "../../utils/requests/getReports";
  import { userStore } from "../../stores/userStore";
  import { reportsStore } from "../../stores/reportsStore";
  import { goto } from "$app/navigation";
  import ErrorRetry from "../../components/ErrorRetry.svelte";

  let isLoading: boolean = true;
  let userName: string;
  let err: any | undefined | null;

  onMount(async () => initHome());

  async function initHome() {
    await getReports($userStore.id ?? import.meta.env.VITE_TELEGRAM_ID)
      .then((e) => reportsStore.set(e))
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });
    userName = $userStore.first_name ?? $userStore.username ?? $userStore.id;

    isLoading = false;
  }
</script>

<div class="container">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <h1 on:click={() => goto("/profile")}>{userName}</h1>
  {#if !isLoading}
    {#if err != null || undefined}
      <div class="center">
        <ErrorRetry {err} onRetry={() => {}} errTitle={null} />
      </div>
    {:else}
      <div class="center">
        <h2>W I P</h2>
      </div>
    {/if}
    <div class="spacer" />
    <button class="my-button">Отчет</button>
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
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    position: relative;
    height: 95vh;
  }

  h1:hover {
    cursor: pointer;
  }
</style>
