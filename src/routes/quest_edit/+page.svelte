<!-- userCard.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import "../../app.css";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";
  import Quest from "../../components/Quest.svelte";
  import LeftArrow from "../../icons/left_arrow.svelte";

  let isLoading = false;
  let isComplete = false;
  let err: any | undefined | null;

  async function onUpdateQuest(params: any) {
    isLoading = true;

    isLoading = false;
  }
</script>

<div>
  {#if !isLoading}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="round-button" on:click={() => goto("/home")}>
      <LeftArrow />
    </div>
    <div class="spacer"></div>
    <h2>Вот твоя анкета,<br />что хочешь исправить?</h2>
    <div class="space"></div>
    <Quest onClick={onUpdateQuest} />
    <div class="spacer"></div>
  {:else}
    <div class="loading-indicator">
      <CircularProgressIndicator />
    </div>
  {/if}
</div>

<style scoped>
  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; /* Высота индикатора загрузки */
  }
  h2 {
    text-align: center;
  }
  .spacer {
    height: 20vh;
  }
  .space {
    height: 40px;
  }
  .round-button {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
