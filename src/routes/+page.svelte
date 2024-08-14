<script lang="ts">
    import { onMount } from "svelte";

    let isTelegramWebApp: boolean = false;
    let webAppData: any = null; // Store the Telegram.WebApp object

    onMount(() => {
        isTelegramWebApp =
            window.Telegram && window.Telegram.WebApp !== undefined;

        if (isTelegramWebApp) {
            webAppData = window.Telegram.WebApp;
        }
    });
</script>

{#if !isTelegramWebApp}
    <p>
        Telegram.WebApp not found. Make sure this script is running within a
        Telegram Mini App.
    </p>
{:else}
    <h2>Telegram.WebApp Data:</h2>
    <pre>{JSON.stringify(webAppData, null, 2)}</pre>
{/if}
