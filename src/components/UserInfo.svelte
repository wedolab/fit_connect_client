<!-- userCard.svelte -->
<script lang="ts">
  import { userStore } from "../stores/userStore";
  let userData = $userStore;
  import { productStore } from "../stores/productStore";
  import Pencil from "../icons/pencil.svelte";
</script>

<div class="dark user-card primary-container">
  <img
    class="avatar"
    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    alt="User Avatar"
  />
  <div class="user-details">
    <!-- Размещаем иконку справа сверху -->
    <div class="icon">
      <Pencil />
    </div>
    <div>{userData.first_name} {userData.last_name}</div>
    {#if $productStore.length != 0}
      <div>
        Product: {$productStore.find((product) => product.isGeneral)?.name}
      </div>
    {/if}
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
  }
</style>
