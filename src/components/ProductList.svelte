<script lang="ts">
  import { productStore } from "../stores/productStore";
  import Scrollable from "./Scrollable.svelte";
</script>

<Scrollable>
  {#each $productStore as product}
    {#if !product.isPrivate}
      <div class="product-item">
        <h3>{product.id}. {product.name}</h3>
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
