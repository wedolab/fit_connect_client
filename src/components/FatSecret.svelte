<script lang="ts">
  import { onMount } from "svelte";
  import { userStore } from "../stores/userStore";
  import { getFatSecret } from "../utils/requests/getFatSecret";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  import { isLoginProcessStore } from "../stores/isLoginProcess";
  import { ServiceLoginProcess } from "../models/ServiceLoginProcess";
  import { convertDate } from "../utils/convertDate";
  import { getFSAuth } from "../utils/requests/getFSAuth";

  export let hasFSAuth: boolean = false;
  export let onComplete: Function;

  let err: any | undefined | null;
  let isLoading = true;
  let googleFitData: any;

  onMount(async () => {
    if (hasFSAuth) {
      const now = new Date();

      googleFitData = await getFatSecret(
        convertDate(now),
        $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID
      ).catch((reason) => {
        console.log(reason);
        err = reason;
      });
    }
    isLoading = false;
  });

  async function onFSAuth() {
    // isLoginProcessStore.set(
    //   new ServiceLoginProcess(true, $isLoginProcessStore.isFatSecretProcess)
    // );
    const telegramUid = $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID;

    const url = await getFSAuth(telegramUid);

    console.log(url);
  }
</script>

{#if !isLoading}
  {#if err != null || undefined}
    <div class="spacer" />
    <div>
      <h2 class="dark my-error">During data loading, an error occurred:</h2>
      <h3 class="dark my-error">{err}</h3>
    </div>
    <div class="spacer" />
  {:else if $isLoginProcessStore.isGoogleProcess}
    <h2>After authorization is completed,<br /> click the OK button.</h2>
    <button class="my-button" on:click={onComplete()}>OK</button>
  {:else if !hasFSAuth}
    <button class="my-button" on:click={onFSAuth}
      >Login with<br />Fat Secret</button
    >
  {:else}
    <h2>
      Calories Data:<br />
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

  .my-error {
    text-align: center;
    color: var(--md-sys-color-error);
  }
</style>
