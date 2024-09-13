<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import CircularProgressIndicator from "../components/CircularProgressIndicator.svelte";
  import { userStore } from "../stores/userStore";
  import NeonText from "../components/NeonText.svelte";
  import { getBaseQuest } from "../utils/requests/getBaseQuest";
  import { goto } from "$app/navigation";

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

  async function startLoading() {
    const loginPromise = getBaseQuest($userStore.id);
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 5000));

    await Promise.all([loginPromise, timerPromise])
      .then(([hasQuest, _]) => {
        if (hasQuest) {
          goto("/home");
          isLoading = false;
        } else {
          goto("/home");
          isLoading = false;
        }
      })
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });
  }

  async function retryLogin() {
    err = null;
    isLoading = true;
    await startLoading();
  }
</script>

<div class="container">
  <div class="center">
    {#if userInfo == null || undefined}
      <h2 class="dark">Hi, {$userStore.first_name} {$userStore.last_name}</h2>
      <h2 class="dark">
        Telegram.WebApp not found.
        <br />Make sure this script is running within
        <br />a Telegram Mini App.
      </h2>
    {:else if isLoading}
      <NeonText text="L A B" />
    {:else}
      <h2 class="dark">
        Привет, {$userStore.first_name}
        {$userStore.last_name}
      </h2>
      <h2 class="dark">Пока ты пытался войти, что-то пошло не так:</h2>
      <h3 class="dark">{err?.toString()}</h3>
      <button class="dark my-button error-button" on:click={retryLogin}
        >Retry</button
      >
    {/if}
  </div>
</div>

<style scope>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
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
