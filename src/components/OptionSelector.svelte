<script lang="ts">
  import type { Writable } from "svelte/store";

  import { onMount } from "svelte";

  export let rawOptions: any;
  export let store: Writable<any>;

  let isLoading: boolean = true;
  let options: Array<any>;

  onMount(() => {
    options = Object.values(rawOptions);
    console.log(options);
    isLoading = false;
  });

  const handleClick = (option: typeof rawOptions) => {
    store.set(option);
  };
</script>

<div class="dark toggle">
  {#if !isLoading}
    {#each options as option}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="dark option {$store === option ? 'active' : ''}"
        on:click={() => handleClick(option)}
      >
        {option}
      </div>
      {#if option !== options[options.length - 1]}
        <div class="divider">|</div>
      {/if}
    {/each}
  {/if}
</div>

<style scoped>
  .toggle {
    display: flex;
    border-radius: 16px;
    background-color: var(--md-sys-color-tertiary-container);
    padding: 4px;
    margin-bottom: 20px;
  }

  .option {
    border-radius: 0;
    padding: 8px;
    color: var(--md-sys-color-on-tertiary-container);
  }

  .option:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  .option:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .option.active {
    background-color: var(--md-sys-color-tertiary);
    color: var(--md-sys-color-on-tertiary);
  }

  .divider {
    flex: 1;
    display: flex;
    justify-items: center;
    align-items: center;
    text-align: center;
    margin-left: 4px;
    margin-right: 4px;
    color: var(--md-sys-color-on-tertiary-container);
  }
</style>
