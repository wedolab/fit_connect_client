<script lang="ts">
  import { subscriptionIdStore } from "../stores/subscriptionStore";
  import { productStore } from "../stores/productStore";
  import { userStore } from "../stores/userStore";
  import SubscribeButton from "./SubscribeButton.svelte";
  import Scrollable from "./Scrollable.svelte";
</script>

<Scrollable>
  {#each $productStore as product}
    {#if !product.isPrivate}
      <div class="product-item">
        <h3>{product.id}. {product.name}</h3>
        {#if !$subscriptionIdStore.includes(product.id)}
          <SubscribeButton userId={"1034119315"} productId={product.id} />
        {/if}
      </div>
    {/if}
  {/each}
</Scrollable>

<style scoped>
  .product-item {
    display: flex;
    align-items: center;
  }
</style>
