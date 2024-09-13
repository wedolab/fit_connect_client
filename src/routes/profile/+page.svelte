<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import { getServiceAuth } from "../../utils/requests/getServiceAuth";
  import { userStore } from "../../stores/userStore";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import { ServiceAuth } from "../../models/ServiceAuth";
  import { isLoginProcessStore } from "../../stores/isLoginProcess";
  import { ServiceLoginProcess } from "../../models/ServiceLoginProcess";
  import ServiceConnect from "../../components/ServiceConnect.svelte";
  import ErrorRetry from "../../components/ErrorRetry.svelte";
  import NeonText from "../../components/NeonText.svelte";
  import { goto } from "$app/navigation";

  let isLoading: boolean = true;
  let serviceStatus: ServiceAuth;
  let err: any | undefined | null;

  onMount(async () => {
    await initServiceAuth();
  });

  async function initServiceAuth() {
    isLoading = true;
    const userId = $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID;

    await getServiceAuth(userId)
      .then((data) => (serviceStatus = data))
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });

    isLoading = false;
    isLoginProcessStore.set(new ServiceLoginProcess(false, false));
  }
</script>

<div class="container" lang="en">
  <h1>Профиль</h1>

  {#if !isLoading}
    {#if err != null || undefined}
      <div class="center">
        <ErrorRetry {err} onRetry={initServiceAuth} errTitle={null} />
      </div>
    {:else}
      <div class="center">
        <div class="flex-display">
          <button class="my-button">Анкета</button>
          <ServiceConnect
            serviceName={"Google"}
            hasServiceAuth={serviceStatus.authGoogle.status}
            isLoginProcess={$isLoginProcessStore.isGoogleProcess}
            onComplete={initServiceAuth}
            onServiceAuth={() =>
              isLoginProcessStore.set(
                new ServiceLoginProcess(
                  true,
                  $isLoginProcessStore.isFatSecretProcess
                )
              )}
            url={serviceStatus.authGoogle.url}
          />
          <ServiceConnect
            serviceName={"Fat Secret"}
            hasServiceAuth={serviceStatus.authFatSecret.status}
            isLoginProcess={$isLoginProcessStore.isFatSecretProcess}
            onComplete={initServiceAuth}
            onServiceAuth={() =>
              isLoginProcessStore.set(
                new ServiceLoginProcess(
                  $isLoginProcessStore.isGoogleProcess,
                  true
                )
              )}
            url={serviceStatus.authFatSecret.url}
          />
        </div>
      </div>
      <div class="spacer" />
      <div>
        <button
          class="my-button my-bottom-button"
          on:click={() => goto("/home")}>Назад</button
        >
        <button class="my-button my-bottom-button" on:click={initServiceAuth}
          >OK</button
        >
      </div>
    {/if}
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
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    height: 90vh;
    margin-top: 20px; /* Отступ сверху 20px */
  }

  .my-bottom-button {
    width: 120px;
    height: 40px;
    color: #d993f5;
    font-size: 12px;
  }

  .flex-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
