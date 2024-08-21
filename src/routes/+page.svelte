<script lang="ts">
  import '../app.css';
  import { onMount } from "svelte";
  import LoginButton from "../components/LogButton.svelte";
  import WelcomeUser from "../components/WelcomeUser.svelte";
  import CircularProgressIndicator from "../components/CircularProgressIndicator.svelte";

  let isTelegramWebApp: boolean | undefined = false;
  let webAppData: any = null;

  const apiUrl: RequestInfo | URL = import.meta.env.VITE_API_URL;
  const apiToken: String = import.meta.env.VITE_API_TOKEN;

  let isLoading = false

  function onClick() {isLoading = true};

  onMount(() => {
      isTelegramWebApp =
          window.Telegram && window.Telegram.WebApp !== undefined;

      if (isTelegramWebApp) {
          webAppData = window.Telegram!.WebApp;

          alert(JSON.stringify(webAppData.initDataUnsafe));
      } else {
          console.error(
              "Telegram.WebApp not found. Make sure this script is running within a Telegram Mini App.",
          );

          alert('Нет никаких данных');
      }
  });

</script>

<div class='page-container'>
    {#if webAppData === null}
        <WelcomeUser webAppData={webAppData} />

        {#if !isLoading} 
                <LoginButton webAppData={webAppData} apiToken={apiToken} apiUrl={apiUrl} onClick={onClick}/>

                <LoginButton webAppData={webAppData} apiToken={apiToken} apiUrl={apiUrl} hasUser={false} buttonTitle={'Sign Up'} onClick={onClick}/> 
        {:else}
            <CircularProgressIndicator />
        {/if}
    {:else}
        <CircularProgressIndicator />
    {/if}
   
</div>



