<script lang="ts">
    import {  createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import BottomNavBar from '../../components/BottomNavBar.svelte';
    import UserInfo from '../../components/UserInfo.svelte';

    // Модель данных
    const selectors = writable([
        { id: 1, url: 'images/burger.webp', name: 'Burger' },
        { id: 2, url: 'images/pineapple.webp', name: 'Pineapple' },
        { id: 3, url: 'images/ramen.webp', name: 'Ramen' },
        { id: 4, url: 'images/mango.webp', name: 'Mango' }
    ]);

    let selectedSelector = { id: 1, url: 'images/burger.webp', name: 'Burger' }; // Выбранный элемент по умолчанию

    const dispatch = createEventDispatcher();

    function handleSelectorChange(event: any) {
        const selectedId = event.target.value;
        selectors.subscribe($selectors => {
            selectedSelector = $selectors.find(selector => selector.id === parseInt(selectedId))!;
            dispatch('selectorChanged', selectedSelector.url);
        });
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Прижимаем к верху */
        align-items: center;
        margin-top: 20px; /* Отступ сверху 20px */
    }

    /* Стили для изображения */
    .image {
        margin-top: 20px;
        height: 240px;
        width: 240px;
    }

    select {
        height: 50px;
        width: 180px;
        border: none; /* Убрать границы */
        border-radius: 16px;
        font-weight: bold; /* Жирный текст */
        font-size: large;
        padding-left: 16px;
        padding-right: 30px; /* Отступ справа для стрелочки */
        appearance: none; /* Скрыть стандартную стрелку селектора */
        background: url('images/arrow_down.webp') no-repeat right 10px center; /* Изображение стрелки и позиционирование */
        background-size: 24px; /* Увеличить размер иконки стрелки */
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
    }

    select option:focus {
        background-color: var(--md-sys-color-on-secondary); /* Изменить цвет выделения на белый */
    }

    h2 {
        text-align: center;
    }
</style>

<BottomNavBar>
    <div class="container">
        <UserInfo />
        <div class="spacer"/>
        <h2>Let's select<br>one of our products</h2>
        <select on:change={handleSelectorChange} class="dark">
            {#each $selectors as selector (selector.id)}
                <option class="dark" value={selector.id}>{selector.name}</option>
            {/each}
        </select>

        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={selectedSelector.url} alt="Selected Image" class="image">
        <div class="spacer"/>
    </div>
</BottomNavBar>