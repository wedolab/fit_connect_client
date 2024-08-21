<script lang="ts">
    import '../../app.css';
    import BottomNavBar from '../../components/BottomNavBar.svelte';
    import { goto } from '$app/navigation';
    import type { CustomTarget } from '../../models/CustomTarget';
    import targetStore from '../../stores/targetStore';
    import UserInfo from '../../components/UserInfo.svelte';

    let targets: CustomTarget[] = [];
    
    targetStore.subscribe(value => {
        targets = value;
    });

  
    function onClick() {
        goto('/select_target')
    };
</script>

<style scoped>
    h2 {
        text-align: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Оставляем элементы в центре */
        margin: 0;
        padding-top: 20px; /* Добавляем отступ сверху */
    }

    button {
        margin-top: 50px;
    }

    .spacer {
        flex: 1;
    }
</style>

<BottomNavBar activeIndex={0}>
    <div class="container">
        <UserInfo />
        <div class='spacer' />
        {#if targets.length > 0}
            <select>
                {#each targets as target}
                    <option value={target.id}>{target.target}</option>
                {/each}
            </select>
        {:else}
            <h2>Sorry, you don't have<br>any targets</h2>
        {/if}

        <button class="my-button" on:click={onClick}>SELECT TARGET</button>
        <div class='spacer' />
    </div>  
</BottomNavBar>