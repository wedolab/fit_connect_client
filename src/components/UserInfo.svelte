<!-- userCard.svelte -->
<script lang="ts">
    import { onMount } from "svelte";

    let isTelegramWebApp: boolean | undefined = false;
    let webAppData: any = null;
    let userFirstName: string | undefined;
    let userLastName: string | undefined;

    onMount(() => {
        isTelegramWebApp = window.Telegram && window.Telegram.WebApp !== undefined;

        if (isTelegramWebApp) {
            webAppData = window.Telegram!.WebApp;

            const userUnsafeData: any = webAppData?.initDataUnsafe?.user; 
            userLastName = userUnsafeData?.last_name ?? 'Undefined';
            userFirstName = userUnsafeData?.first_name ?? 'Undefined';
        } else {
            console.error("Telegram.WebApp not found. Make sure this script is running within a Telegram Mini App.");
        }
    });
</script>

<style>
    .user-card {
        height: 85px;
        width: 280px;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1); /* Добавляем элевацию */
    }

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        margin-right: 24px;
        margin-left: 16px;
    }

    
</style>

<div class="dark user-card primary-container">
    <img class="avatar" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User Avatar">
    <div class="user-details">
        <div>{userFirstName} {userLastName}</div>
        <div>Membership: Member</div> <!-- Здесь будет статус подписки пользователя -->
    </div>
</div>