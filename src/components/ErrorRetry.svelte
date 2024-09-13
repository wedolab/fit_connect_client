<script lang="ts">
  export let errTitle: string | null | undefined;
  export let err: any;
  export let onRetry: Function;
</script>

<div>
  <h2 class="dark my-error">
    {errTitle == null || undefined
      ? "Во время загрузки данных произошла ошибка:"
      : errTitle}
  </h2>
  <h3 class="dark my-error">{err}</h3>
  <button class="my-button error-button" on:click={onRetry()}>Retry</button>
</div>

<style scoped>
  .error-button {
    color: var(--md-sys-color-error-container);
    background-color: var(--md-sys-color-on-error-container);
  }
</style>
