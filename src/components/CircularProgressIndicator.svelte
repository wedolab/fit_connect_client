<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let rotation = 0;

    const rotate = () => {
        rotation = (rotation + 1) % 360;
    };

    let interval: number;

    onMount(() => {
        interval = setInterval(rotate, 10);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<style>
    .circle {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #4f0a6c;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<div class="circle" style="transform: rotate({rotation}deg)"></div>