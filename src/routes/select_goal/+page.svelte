<!-- +page.svelte -->
<script lang="ts">
    import '../../app.css';
    import { goto } from '$app/navigation';
    import targetStore from '../../stores/targetStore'; // Импорт хранилища
    import { CustomGoal, SubTarget } from '../../models/CustomGoal';
    import { generateUUID } from '../../utils/uuidGenerator';

    

    let customTarget: CustomGoal = new CustomGoal(generateUUID(), '', [
       new SubTarget(generateUUID(), '', 0)
    ]);

    function addSubTarget() {
        customTarget.subTargets = [
            ...customTarget.subTargets,
            new SubTarget(generateUUID(), '', 0)
        ];
    }

    function removeSubTarget(subTargetId: string) {
        customTarget.subTargets = customTarget.subTargets.filter(subTarget => subTarget.id !== subTargetId);
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
    }

    .subTarget-container {
        margin-top: 20px;
    }

    .button-container {
        margin-top: 20px;
    }
</style>

<div class="content">
    <input type="text" bind:value={customTarget.goal} placeholder="Our Goal">

    {#if customTarget.subTargets.length > 0}
        {#each customTarget.subTargets as subTarget, index (subTarget.id)}
            <div class="subTarget-container">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>SubGoal {index + 1}</label>
                <input type="text" bind:value={subTarget.subtarget}>
                <button on:click={() => removeSubTarget(subTarget.id)}>Delete</button>
            </div>
        {/each}
    {/if}

    <div class="button-container">
        <button on:click={addSubTarget} class="my-button">Add sub Goal</button>
    </div>

    <div class="button-container">
        <button on:click={saveTarget} class="my-button">Save Goal</button>
    </div>
</div>

<button style="position: absolute; top: 10px; left: 10px;" on:click={goHome}>На главную</button>