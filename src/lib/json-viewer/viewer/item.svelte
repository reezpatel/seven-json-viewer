<script>
	import ArrayComponent from './array.svelte';
	import ObjectComponent from './object.svelte';

	export let input = {};
</script>

{#if Array.isArray(input)}
	<ArrayComponent {input} />
{:else}
	<ObjectComponent {input} />
{/if}
