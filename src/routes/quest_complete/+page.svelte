

<script lang="ts">
    import '../../app.css';
    import { goto } from '$app/navigation';

    function onClick() {
        goto('/home');
    }
</script>

<style scoped>
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    h3 {
        text-align: center;
    }

    button {
        margin: 20px 0 0 0;
        font-size: larger;
    }
</style>

<div class="page-container">
    <h2>We've get all the data</h2>
    <h3>Now we now all what need to help you<br>And all was set</h3>
    <button  class='my-button' on:click={onClick}>Let's continue</button>   
</div>