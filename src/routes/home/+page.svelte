<script lang="ts">
  import { onMount } from "svelte";
  import BottomNavBar from "../../components/BottomNavBar.svelte";
  import UserInfo from "../../components/UserInfo.svelte";
  import OptionSelector from "../../components/OptionSelector.svelte";
  import { getProducts } from "../../utils/requests/getProducts";
  import { getSubscriptions } from "../../utils/requests/getSubscriptions";
  import { productStore } from "../../stores/productStore";
  import { subscriptionStore } from "../../stores/subscriptionStore";
  import { userStore } from "../../stores/userStore";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";

  let isLoading: boolean = true;
  let err: any | undefined;

  onMount(async () => initHome());

  async function initHome() {
    try {
      await getSubscriptions($userStore.id ?? "1034119315");
      isLoading = false;
    } catch (error) {
      err = error;
      isLoading = false;
    }
  }
</script>

<BottomNavBar>
  <div class="container">
    <UserInfo />
    {#if !isLoading}
      <OptionSelector />
      <div class="spacer" />
      {#if err != undefined}
        <h2 class="dark my-error">
          During data loading, an error occurred: <br />
          {$err}
        </h2>
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

  .my-error {
    color: var(--md-sys-color-error);
  }
</style>
