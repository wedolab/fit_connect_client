<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import CircularProgressIndicator from "../components/CircularProgressIndicator.svelte";
  import { userStore } from "../stores/userStore";
  import NeonText from "../components/NeonText.svelte";

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
      await startLoading();
    }
  });

  async function login() {
    // Simulate login process
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async function startLoading() {
    const loginPromise = login();
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 5000));

    await Promise.all([loginPromise, timerPromise]);
    isLoading = false;
  }

  async function retryLogin() {
    err = null;
    isLoading = true;
    await startLoading();
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
    <NeonText text="<LAB />" />
  {:else}
    <h2 class="dark">Привет, {$userStore.first_name} {$userStore.last_name}</h2>
    <h2 class="dark">Пока ты пытался войти, что-то пошло не так:</h2>
    <h3 class="dark">{err?.toString()}</h3>
    <button class="dark my-button error-button" on:click={retryLogin}
      >Retry</button
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

  .error-button {
    color: var(--md-sys-color-error-container);
    background-color: var(--md-sys-color-on-error-container);
  }

  h2,
  h3 {
    color: var(--md-sys-color-error);
  }
</style>
