<script lang="ts">
  import { goto } from "$app/navigation";
  import "../../app.css";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";

  import Quest from "../../components/Quest.svelte";
  import { userStore } from "../../stores/userStore";
  import { postUserQuest } from "../../utils/requests/postUserQuest";

  let isLoading = false;

  async function onSendQuest(params: any) {
    isLoading = true;
    const userId = $userStore.id ?? import.meta.env.VITE_TELEGRAM_ID;
    try {
      await postUserQuest(userId, params).then(() => {
        goto("/home");
      });
    } catch (e) {
      throw e;
    }
  }
</script>

<div class="container">
  {#if !isLoading}
    <h2>Анкета</h2>
    <div class="center">
      <Quest onClick={onSendQuest} />
    </div>
  {:else}
    <div class="center">
      <CircularProgressIndicator />
    </div>
  {/if}
</div>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    height: 90vh;
    margin-top: 20px; /* Отступ сверху 20px */
  }
  h2 {
    text-align: center;
  }
</style>
