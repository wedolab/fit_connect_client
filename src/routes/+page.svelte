<script lang="ts">
  import '../app.css';
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import CircularProgressIndicator from "../components/CircularProgressIndicator.svelte";

  let isTelegramWebApp: boolean | undefined = false;
  let webAppData: any = null;
  let userInfo: any | undefined;

  const apiUrl: RequestInfo | URL = import.meta.env.VITE_API_URL;
  const apiToken: String = import.meta.env.VITE_API_TOKEN;

  
    onMount(async () => {
        isTelegramWebApp =
            window.Telegram && window.Telegram.WebApp !== undefined;
        webAppData = window.Telegram?.WebApp;
        userInfo = webAppData?.initDataUnsafe?.user;
        

        if (userInfo != undefined) {
            await sendAuthData().then(() => goto('/home'));
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

<style scope>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; 
        margin: 0 auto; 
        text-align: center;
    }
</style>

<div class="container">
    {#if userInfo == null || undefined} 
        <h2>Telegram.WebApp not found.<br>Make sure this script is running within<br>a Telegram Mini App.</h2>
    {:else}
        <CircularProgressIndicator />
    {/if}
</div>
