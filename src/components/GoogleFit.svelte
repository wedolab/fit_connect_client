<script lang="ts">
  import { onMount } from "svelte";
  import { userStore } from "../stores/userStore";
  import { getGoogleAuth } from "../utils/requests/getGoogleAuth";
  import { getGoogleFit } from "../utils/requests/getGoogleFit";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  import { isLoginProcessStore } from "../stores/isLoginProcess";
  import { ServiceLoginProcess } from "../models/ServiceLoginProcess";

  export let hasGoogleAuth: boolean = false;
  export let onComplete: Function;

  let isLoading = true;
  let googleFitData: any;

  onMount(async () => {
    if (hasGoogleAuth) {
      googleFitData = await getGoogleFit($userStore.id);
    }
    isLoading = false;
  });

  async function onGoogleAuth() {
    isLoginProcessStore.set(
      new ServiceLoginProcess(true, $isLoginProcessStore.isFatSecretProcess)
    );
    const telegramUid = $userStore.id;

    await getGoogleAuth(telegramUid).then((res) => {
      if (res != false) {
        window.Telegram!.WebApp.openLink(res, { try_instant_view: true });
      }
    });
  }
</script>

{#if !isLoading}
  {#if $isLoginProcessStore.isGoogleProcess}
    <h2>After authorization is completed,<br /> click the OK button.</h2>
    <button class="my-button" on:click={onComplete()}>OK</button>
  {:else if !hasGoogleAuth}
    <button class="my-button" on:click={onGoogleAuth}>Login with Google</button>
  {:else}
    <h2>
      Fitness Data:<br />
      {#each googleFitData as data}
        <br />
        {data.key.charAt(0).toUpperCase() + data.key.slice(1)}: {data.value}
      {/each}
    </h2>
  {/if}
{:else}
  <CircularProgressIndicator />
{/if}

<style scoped>
  h2 {
    text-align: center;
  }
</style>
