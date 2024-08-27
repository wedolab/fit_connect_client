<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import CircularProgressIndicator from "../components/CircularProgressIndicator.svelte";
  import { postAuthData } from "../utils/requests/postAuthData";
  import { userStore } from "../stores/userStore";

  let isTelegramWebApp: boolean | undefined = false;
  let webAppData: any = null;
  let userInfo: any | undefined;
  let isLoading: boolean = true;
  let err: string | undefined | null;

  onMount(async () => {
    isTelegramWebApp = window.Telegram && window.Telegram.WebApp !== undefined;
    webAppData = window.Telegram?.WebApp;
    userInfo = webAppData?.initDataUnsafe?.user;

    if (userInfo != undefined) {
      userStore.set(userInfo);
      await login();
    }
  });

  async function login() {
    await postAuthData(webAppData)
      .then(() => goto("/home"))
      .catch((error) => {
        err = error;
        isLoading = false;
      });
  }

  async function retryLogin() {
    err = null;
    isLoading = true;
    await login();
  }
</script>

<div class="container">
  {#if userInfo == null || undefined}
    <h2 class="dark">Hi, {$userStore.first_name} {$userStore.last_name}</h2>
    <h2 class="dark">
      Telegram.WebApp not found.
      <br />Make sure this script is running within
      <br />a Telegram Mini App.
    </h2>
  {:else if isLoading}
    <CircularProgressIndicator />
  {:else}
    <h2 class="dark">Hi, {$userStore.first_name} {$userStore.last_name}</h2>
    <h2 class="dark">Something goes wrong with you Login:</h2>
    <h3 class="dark">{err?.toString()}</h3>
    <button
      class="dark my-button error-container on-error-container"
      on:click={retryLogin}>Retry</button
    >
  {/if}
</div>

<style scope>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
  }

  h2,
  h3 {
    color: var(--md-sys-color-error);
  }
</style>
