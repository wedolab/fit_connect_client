<script lang="ts">
  import "../../app.css";
  import { getGoogleAuth } from "../../utils/requests/getGoogleAuth";
  import { userStore } from "../../stores/userStore";
  import BottomNavBar from "../../components/BottomNavBar.svelte";
  import CircularProgressIndicator from "../../components/CircularProgressIndicator.svelte";

  let isLoading: boolean = false;

  async function onClick() {
    isLoading = true;
    await getGoogleAuth($userStore.id ?? "1034119315")
      .then((redirect) => {
        if (redirect != false) {
          window.location.href = redirect;
        }
      })
      .catch((reason) => console.log(reason));
    isLoading = false;
  }
</script>

<BottomNavBar activeIndex={1}>
  <div class="container">
    <h1>Profile</h1>
    <div class="spacer" />
    {#if !isLoading}
      <button class="my-button" on:click={onClick}>Login with Google</button>
    {:else}
      <CircularProgressIndicator />
    {/if}
    <div class="spacer" />
  </div>
</BottomNavBar>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Прижимаем к верху */
    align-items: center;
    margin-top: 20px; /* Отступ сверху 20px */
  }
</style>
