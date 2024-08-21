
<!-- src/lib/BottomNavBar.svelte -->
<script lang="ts">
  import '../app.css';
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
    justify-content: center;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }

  .nav-item {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    font-size: large;
  }

  .active {
    font-weight: bold;
  }
</style>

<div class="container">
  <div class="content">
    <slot></slot> 
  </div>
  <div class="dark nav surface-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each items as item, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="nav-item {activeIndex === index ? 'on-primary-container active' : 'on-surface'}"
        on:click={() => handleNavigation(index)}
      >
        {item.label}
      </div>
    {/each}
  </div>
</div>
