<script lang="ts">
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";

  export let hasServiceAuth: boolean;
  export let isLoginProcess: boolean;
  export let onComplete: Function;
  export let serviceName: string;
  export let url: string;
  export let onServiceAuth: Function;

  let err: any | undefined | null;
  let isLoading = false;
  async function _onServiceAuth() {
    isLoading = true;
    onServiceAuth();

    try {
      window.Telegram!.WebApp.openLink(url, {
        try_instant_view: true,
      });
      isLoading = false;
    } catch (error) {
      err = error;
      isLoading = false;
    }
  }
</script>

{#if !isLoading}
  {#if err != null || undefined}
    <div>
      <h2 class="dark my-error">Во время загрузки произошла ошибка:</h2>
      <h3 class="dark my-error">{err}</h3>
    </div>
  {:else if isLoginProcess}
    <h2>После завершения авторизации,<br /> нажмите кнопку OK.</h2>
    <button class="my-button" on:click={onComplete()}>OK</button>
  {:else if !hasServiceAuth}
    <button class="my-button" on:click={_onServiceAuth}
      >Login with {serviceName}</button
    >
  {:else}
    <h2 class="dark">Есть соединение с {serviceName}</h2>
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
