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
  let fatSecret: any;

  onMount(async () => {
    if (hasFSAuth) {
      const now = new Date();

      const data = await getFatSecret(
        convertDate(now),
        $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID
      ).catch((reason) => {
        console.log(reason);
        err = reason;
      });

      fatSecret = data;
    }

    console.log(fatSecret);
    isLoading = false;
  });

  async function onFSAuth() {
    isLoginProcessStore.set(
      new ServiceLoginProcess($isLoginProcessStore.isGoogleProcess, true)
    );
    const telegramUid = $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID;

    const url = await getFSAuth(telegramUid);

    if (url != null) {
      window.Telegram!.WebApp.openLink(url, {
        try_instant_view: true,
      });
    } else {
      isLoginProcessStore.set(
        new ServiceLoginProcess($isLoginProcessStore.isGoogleProcess, false)
      );
    }
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
  {:else if $isLoginProcessStore.isFatSecretProcess}
    <h2>After authorization is completed,<br /> click the OK button.</h2>
    <button class="my-button" on:click={onComplete()}>OK</button>
  {:else if !hasFSAuth}
    <button class="my-button" on:click={onFSAuth}>Login with Fat Secret</button>
  {:else if fatSecret != null || undefined}
    <h2>
      Питание:<br />
      <div>
        Ккал: {fatSecret.calories} / Белки: {fatSecret.protein}
      </div>
      <div>
        Жиры: {fatSecret.fat} / Углеводы: {fatSecret.carbohydrate}
      </div>
    </h2>
  {:else}
    <div>
      <h2 class="dark my-error">За сегодняшний день<br />данные не найдены</h2>
      <h3 class="dark my-error">
        Попробуй добавить отчет<br /> и вернись через часок
      </h3>
    </div>
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
