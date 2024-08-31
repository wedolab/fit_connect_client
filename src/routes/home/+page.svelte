<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import BottomNavBar from "../../components/BottomNavBar.svelte";
  import UserInfo from "../../components/UserInfo.svelte";
  import OptionSelector from "../../components/OptionSelector.svelte";
  import ProductList from "../../components/ProductList.svelte";
  import SubscribeList from "../../components/SubscribeList.svelte";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import { getProducts } from "../../utils/requests/getProducts";
  import { getSubscriptions } from "../../utils/requests/getSubscriptions";
  import { productStore } from "../../stores/productStore";
  import { userStore } from "../../stores/userStore";
  import { homeOptionsStore, HomeOptions } from "../../stores/homeOptionsStore";
  import {
    subscriptionStore,
    subscriptionIdStore,
  } from "../../stores/subscriptionStore";

  let isLoading: boolean = true;
  let err: any | undefined | null;

  onMount(async () => initHome());

  async function initHome() {
    await getProducts()
      .then((e) => productStore.set(e))
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });
    await getSubscriptions($userStore.id)
      .then((e) => {
        subscriptionStore.set(e);
        subscriptionIdStore.set(e.map((e) => e.product.id));
      })
      .catch((reason) => {
        console.log(reason);
        err = reason;
      });

    isLoading = false;
  }
</script>

<BottomNavBar>
  <div class="container">
    <UserInfo />
    {#if !isLoading}
      {#if err != null || undefined}
        <div class="spacer" />
        <div>
          <h2 class="dark my-error">During data loading, an error occurred:</h2>
          <h3 class="dark my-error">{err}</h3>
        </div>
        <div class="spacer" />
      {:else}
        <OptionSelector rawOptions={HomeOptions} store={homeOptionsStore} />
        {#if $homeOptionsStore === HomeOptions.PRODUCTS}
          <ProductList />
        {:else if $homeOptionsStore === HomeOptions.SUBSCRIPTIONS}
          <SubscribeList />
        {/if}
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
