<script lang="ts">
    import { onMount } from "svelte";

    let isTelegramWebApp = false;
    let webAppData: any = null;

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    onMount(() => {
        isTelegramWebApp =
            window.Telegram && window.Telegram.WebApp !== undefined;

        if (isTelegramWebApp) {
            webAppData = window.Telegram.WebApp;
        } else {
            console.error(
                "Telegram.WebApp not found. Make sure this script is running within a Telegram Mini App.",
            );
        }
    });

    async function sendAuthData() {
        if (isTelegramWebApp && apiToken) {
            // Also check if apiToken is available
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${apiToken}`,
                    },
                    body: JSON.stringify(webAppData),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                console.log("Data sent successfully!");
            } catch (error) {
                console.error("Error sending data:", error);
            }
        } else {
            console.error(
                "Either Telegram.WebApp is not available or API token is missing.",
            );
        }
    }
</script>

{#if !isTelegramWebApp}
    <p>
        Telegram.WebApp not found. Make sure this script is running within a
        Telegram Mini App.
    </p>
{:else}
    <h2>Telegram.WebApp Data:</h2>
    <pre>{JSON.stringify(webAppData, null, 2)}</pre>

    <button on:click={sendAuthData}>Send Auth Data</button>
{/if}
