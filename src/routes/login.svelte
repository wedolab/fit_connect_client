<script lang="ts">
    import { onMount } from "svelte";
    import LoginButton from "../components/LoginButton.svelte";
  import WelcomeUser from "../components/WelcomeUser.svelte";

    let isTelegramWebApp = false;
    let webAppData: any = null;

    onMount(() => {
        isTelegramWebApp =
            window.App.Telegram && window.App.Telegram.WebApp !== undefined;

        if (isTelegramWebApp) {
            webAppData = window.App.Telegram.WebApp;
        } else {
            console.error(
                "Telegram.WebApp not found. Make sure this script is running within a Telegram Mini App.",
            );
        }
    });

</script>

{#if !isTelegramWebApp}
    <p>
        Telegram.WebApp not found. Make sure this script is running within a
        Telegram Mini App.
    </p>
{:else}
    <WelcomeUser webAppData={webAppData} />

    <LoginButton webAppData={webAppData} />
{/if}
