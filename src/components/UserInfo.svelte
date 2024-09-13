<!-- userCard.svelte -->
<script lang="ts">
  import { userStore } from "../stores/userStore";
  let userData = $userStore;
  import Pencil from "../icons/pencil.svelte";
  import { goto } from "$app/navigation";

  function goToQuest(): void {
    goto("/quest_edit");
  }
</script>

<div class="dark user-card primary-container">
  <img
    class="avatar"
    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    alt="User Avatar"
  />
  <div class="user-details">
    <!-- Размещаем иконку справа сверху -->
    <button on:click={goToQuest} class="dark icon">
      <Pencil />
    </button>
    <div class="dark">{userData.first_name} {userData.last_name}</div>
  </div>
</div>

<style scoped>
  .user-card {
    position: relative; /* Добавляем позиционирование, чтобы размещать иконку */
    height: 85px;
    width: 280px;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 2px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 24px;
    margin-left: 16px;
  }

  .icon {
    position: absolute; /* Позиционируем иконку абсолютно */
    top: 16px; /* Отступ сверху */
    right: 16px; /* Отступ справа */
    border: none;
    background: none;
    padding: 0;
    color: var(--md-sys-color-primary);
    cursor: pointer;
  }

  .icon:focus {
    outline: none; /* Убираем фокусовую обводку */
  }
</style>
