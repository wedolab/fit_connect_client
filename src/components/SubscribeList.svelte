<script lang="ts">
  import { subscriptionStore } from "../stores/subscriptionStore";
  import Scrollable from "./Scrollable.svelte";
</script>

<Scrollable>
  {#each $subscriptionStore as subscription}
    <div class="product-item">
      <h3>{subscription.product.id}. {subscription.product.name}</h3>
    </div>
  {/each}
</Scrollable>
