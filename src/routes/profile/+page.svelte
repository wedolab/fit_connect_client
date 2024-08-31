<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import { getServiceAuth } from "../../utils/requests/getServiceAuth";
  import { userStore } from "../../stores/userStore";
  import BottomNavBar from "../../components/BottomNavBar.svelte";
  import GoogleFit from "../../components/GoogleFit.svelte";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import { ServiceAuth } from "../../models/ServiceAuth";
  import OptionSelector from "../../components/OptionSelector.svelte";
  import {
    profileOptionsStore,
    ProfileOptions,
  } from "../../stores/profileOptionsStore";
  import { isLoginProcessStore } from "../../stores/isLoginProcess";
  import { ServiceLoginProcess } from "../../models/ServiceLoginProcess";
  import FatSecret from "../../components/FatSecret.svelte";

  let isLoading: boolean = true;
  let serviceStatus: ServiceAuth;
  let err: any | undefined | null;

  onMount(async () => {
    await initServiceAuth();
  });

  async function initServiceAuth() {
    isLoading = true;
    await getServiceAuth($userStore.id ?? import.meta.env.VITE_TELEGRAM_ID)
      .then((status) => {
        serviceStatus = status;
      })
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });
    isLoading = false;
    isLoginProcessStore.set(new ServiceLoginProcess(false, false));
  }
</script>

<BottomNavBar activeIndex={1}>
  <div class="container" lang="en">
    <h1>Profile</h1>

    {#if !isLoading}
      {#if err != null || undefined}
        <div class="spacer" />
        <div>
          <h2 class="dark my-error">During data loading, an error occurred:</h2>
          <h3 class="dark my-error">{err}</h3>
        </div>
        <div class="spacer" />
      {:else}
        <OptionSelector
          store={profileOptionsStore}
          rawOptions={ProfileOptions}
        />
        <div class="spacer" />
        {#if $profileOptionsStore === ProfileOptions.GOOGLE_FIT}
          <GoogleFit
            onComplete={initServiceAuth}
            hasGoogleAuth={serviceStatus.authGoogle}
          />
        {:else if $profileOptionsStore === ProfileOptions.FAT_SECRET}
          <FatSecret />
        {/if}
        <div class="spacer" />
      {/if}
    {:else}
      <div class="spacer" />
      <CircularProgressIndicator />
      <div class="spacer" />
    {/if}
  </div>
</BottomNavBar>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    margin-top: 20px; /* Отступ сверху 20px */
  }

  .my-error {
    text-align: center;
    color: var(--md-sys-color-error);
  }
</style>
