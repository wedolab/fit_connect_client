<script lang="ts">
    import '../../app.css';
    import { goto } from '$app/navigation';
    import Trash from '../../icons/trash.svelte';
    import LeftArrow from '../../icons/left_arrow.svelte';
    import targetStore from '../../stores/targetStore'; // Импорт хранилища
    import { CustomGoal, SubTarget } from '../../models/CustomGoal';
    import { generateUUID } from '../../utils/uuidGenerator';
    import { onMount } from 'svelte';
    import { tick } from 'svelte';

    let customTarget: CustomGoal = new CustomGoal(generateUUID(), '', [
       new SubTarget(generateUUID(), '', 0)
    ]);

    let showMoreSubTargets = false;

    onMount(() => {
        tick().then(() => {
            if (customTarget.subTargets.length > 5) {
                showMoreSubTargets = true;
            }
        });
    });

    function addSubTarget() {
        customTarget.subTargets = [
            ...customTarget.subTargets,
            new SubTarget(generateUUID(), '', 0)
        ];
        
        if (customTarget.subTargets.length > 5) {
            showMoreSubTargets = true;
        }
    }

    function removeSubTarget(subTargetId: string) {
        customTarget.subTargets = customTarget.subTargets.filter(subTarget => subTarget.id !== subTargetId);
        
        if (customTarget.subTargets.length <= 5) {
            showMoreSubTargets = false;
        }
    }

    function saveTarget() {
        if (customTarget.goal.length === 0) {
            alert('Need to add big goal name');
            return;
        }

        if (customTarget.subTargets.length < 1) {
            alert('Neet to add minimum 1 sub goal');
            return;
        }

        targetStore.update((targets) => [...targets, customTarget]); // Обновление хранилища
        goto('/home');
    }

    function goHome() {
        goto('/home');
    }

    function toggleSubTargets() {
        showMoreSubTargets = !showMoreSubTargets;
    }
</script>

<style>
    /* Центрирование контента по центру, за исключением правого верхнего угла */
    :global(body) {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        height: 100vh;
        overflow: hidden;
    }

    .content {
        margin: auto;
        text-align: center;
        max-width: 80%;
        margin-top: 20px; /* Дополнительный отступ сверху */
    }

    .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        width: 12px;
        height: 12px;
        color: var(--md-sys-color-secondary);
        margin: 0;
        padding: 0;
    }


    .container {
        margin: auto;
        max-height: 45vh;
        width: 60vw;
        overflow-y: auto;
        scrollbar-width: thin; /* Установите толщину скроллбара */
        scrollbar-color: var(--md-sys-color-on-secondary) var(--md-sys-color-secondary) ; /* Установите цвет скроллбара */
    }

    .container::-webkit-scrollbar {
        width: 5px; /* Установите ширину скроллбара для WebKit браузеров */
    }

    .container::-webkit-scrollbar-track {
        background: var(--md-sys-color-on-secondary); /* Цвет фона дорожки скроллбара для WebKit браузеров */
    }

    .container::-webkit-scrollbar-thumb {
        background-color: var(--md-sys-color-secondary); /* Цвет ползунка скроллбара для WebKit браузеров */
    }


    .subTarget-container {
        margin-top: 20px;
    }

    .button-container {
        margin-top: 20px;
    }

    .input {
        height: 12px;
        width: 180px;
        border: 2px solid #998d9a;
        border-radius: 16px; 
        padding: 12px;
        font-size: 16px; 
        font-weight: bold;
        margin-bottom: 8px;
        margin-left: 8px;
    }

    .form-input {
        height: 50px;
        width: 200px;
        border-radius: 8px 8px 0 0; 
        border: none; 
        outline: none; 
        font-weight: bold; 
        padding-left: 12px;
    }

    .form-input:focus {
        border-bottom: 2px solid var(--md-sys-color-secondary); 
    }


</style>

<div class="content">
    <h2>Let's plan our goal.</h2>
    <h4>And all the small steps.</h4>
    <input type="text" class="dark form-input" bind:value={customTarget.goal} placeholder="Our Goal">

    {#if customTarget.subTargets.length > 0}
        <div class="dark container">
            {#each customTarget.subTargets as subTarget, index (subTarget.id)}
                <div class="subTarget-container">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Small Step {index + 1}</label>
                    <input type="text" class="input" bind:value={subTarget.subtarget}>
                    <button on:click={() => removeSubTarget(subTarget.id)} class="dark icon-button">
                        <Trash />
                    </button>
                </div>
            {/each}
        </div>
    {/if}

    <div class="button-container">
        <button on:click={addSubTarget} class="my-button">Add sub Goal</button>
    </div>

    <div class="button-container">
        <button on:click={saveTarget} class="my-button">Save Goal</button>
    </div>
</div>

<button style="position: absolute; top: 10px; left: 10px;" class="dark icon-button" on:click={goHome}>
    <LeftArrow />
</button>