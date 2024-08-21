<script lang="ts">
    import '../../app.css';
    import BottomNavBar from '../../components/BottomNavBar.svelte';
    import { onMount } from "svelte";

    let isTelegramWebApp: boolean | undefined = false;
    let webAppData: any = null;
    let userName: string | undefined;
    let userLastName: string | undefined;


    onMount(() => {
      isTelegramWebApp =
          window.Telegram && window.Telegram.WebApp !== undefined;

      if (isTelegramWebApp) {
          webAppData = window.Telegram!.WebApp;

          const unsafeData: any = webAppData?.initDataUnsafe; 
          userLastName = unsafeData?.last_name ?? 'Undefined';
          userName = unsafeData?.first_name ?? 'Undefined';
      } else {
          console.error(
              "Telegram.WebApp not found. Make sure this script is running within a Telegram Mini App.",
          );
      }
    });
</script>

<BottomNavBar activeIndex={0}>
    
</BottomNavBar>