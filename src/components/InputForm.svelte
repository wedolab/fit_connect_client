<script lang="ts">
	export let value: string | undefined, label, type = 'text';

	function typeAction(node: HTMLInputElement){
		node.type = type;
	}
</script>

<p class="form-control">
	{#if label}
		<h3 class="label">{label}</h3>
	{/if}
	<input use:typeAction class="input" bind:value={value}/>
</p>

<style scoped>
	.form-control{
		margin: .5rem 0;
		text-align: left;
	}
	.input {
        height: 12px;
        width: 180px;
        border: 1px solid #9f3800;
        border-radius: 16px; 
        padding: 12px;
        background-color: #ffb599;
        color: #5a1c00;
        font-size: 16px; 
        font-weight: bold;
    }

    
    h3 {
      text-align: center;
    }
</style>