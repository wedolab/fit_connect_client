
<!-- src/lib/BottomNavBar.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';

  const items = [
      { label: 'Home', path: '/home' },
      { label: 'Profile', path: '/profile' }
    ];
  
  export let activeIndex: number = 0;

  function handleNavigation(index: number) {
    if (index != activeIndex) {
      goto(items[index].path);
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh; 
  }

  .content {
    flex: 1; /* Занимает оставшееся пространство */
    display: flex;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    background-color: #40322c;
    padding: 10px 0;
  }

  .nav-item {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    color: #e0c0b4;
    font-size: large;
  }

  .active {
    font-weight: bold;
    color: #e8d56f;
  }
</style>

<div class="container">
  <div class="content">
    <slot></slot> 
  </div>
  <div class="nav">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each items as item, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="nav-item {activeIndex === index ? 'active' : ''}"
        on:click={() => handleNavigation(index)}
      >
        {item.label}
      </div>
    {/each}
  </div>
</div>
