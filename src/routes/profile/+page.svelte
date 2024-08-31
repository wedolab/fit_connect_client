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

  onMount(async () => {
    await initServiceAuth();
  });

  async function initServiceAuth() {
    isLoading = true;
    serviceStatus = await getServiceAuth($userStore.id);
    isLoading = false;
    isLoginProcessStore.set(new ServiceLoginProcess(false, false));
  }
</script>

<BottomNavBar activeIndex={1}>
  <div class="container">
    <h1>Profile</h1>

    {#if !isLoading}
      <OptionSelector store={profileOptionsStore} rawOptions={ProfileOptions} />
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
</style>
