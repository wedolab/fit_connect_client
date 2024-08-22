

<script lang="ts">
    import { goto } from '$app/navigation';
    import { fakeRequest } from '../utils/fakeRequest';

    export let buttonTitle: string = 'Login';
    export let webAppData: any;
    export let apiUrl: RequestInfo | URL;
    export let apiToken: String;
    export let onClick: Function;
    export let hasUser: boolean = true;
  
    async function sendTestData() {
        onClick();
        await fakeRequest();

        if (hasUser) {
            goto('/home', {replaceState: true});
        } else {
            goto('/quest', {replaceState: true});
        }


    }

    async function sendAuthData() {
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
            }
        } else {
            console.error(
                "Either Telegram.WebApp is not available or API token is missing.",
            );
        }
    }
</script>

<style scoped>
    button {
        margin-top: 20px;
    }
</style>

<button on:click={sendTestData} class="my-button">{buttonTitle}</button>



  
  