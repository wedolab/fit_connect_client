<script lang="ts">
  import { postSubscription } from "../utils/requests/postSubscription";
  import {
    subscriptionIdStore,
    subscriptionStore,
  } from "../stores/subscriptionStore";
  import CircularProgressIndicator from "./CircularProgressIndicator.svelte";

  export let userId: string;
  export let productId: number;

  let isLoading = false;

  async function setSubscribe() {
    isLoading = true;
    await postSubscription(userId, productId)
      .then((sub) => {
        subscriptionStore.update((arr) => [...arr, sub]);
        subscriptionIdStore.update((arr) => [...arr, productId]);
        isLoading = false;
      })
      .catch((reason) => {
        isLoading = false;
        alert(reason);
      });
  }
</script>

{#if !isLoading}
  <button class="my-button" on:click={setSubscribe}>Subscribe</button>
{:else}
  <div><CircularProgressIndicator /></div>
{/if}

<style scope>
  div {
    margin-left: 8px;
    width: 80px;
  }
  button {
    margin-left: 8px;
    height: 28px;
    width: 80px;
    font-size: small;
  }
</style>
