

<script lang="ts">
    import CircularProgressIndicator from "./CircularProgressIndicator.svelte";
  
    export let webAppData: any;
  
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;
  
    let isLoading = false;
  
    async function sendAuthData() {
        isLoading = true;
  
        if (apiToken) {
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
            } finally {
                isLoading = false;
            }
          } else {
            console.error(
                "Either Telegram.WebApp is not available or API token is missing.",
            );
  
            isLoading = false;
        }
    }
</script>
  
  

 
{#if !isLoading}
  <button on:click={sendAuthData}>Login</button>
{:else}
  <CircularProgressIndicator />
{/if}


  
  