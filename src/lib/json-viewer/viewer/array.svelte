<script>
	import Base from './base.svelte';
	import ObjectComponent from './object.svelte';
	import ValueComponent from './value.svelte';

	export let input = Array();
	export let label = '';
	export let indent = 0;

	$: newIndent = indent + 1;
</script>

<Base {label} {indent} canToggle={true}>
	<svelte:fragment slot="bracketOpen">
		{'['}
	</svelte:fragment>

	<svelte:fragment slot="content">
		{#each input as item, i (i)}
			{#if Array.isArray(item)}
				<svelte:self input={item} indent={newIndent} />
			{:else if typeof item === 'object' && item !== null}
				<ObjectComponent input={item} indent={newIndent} />
			{:else}
				<ValueComponent input={item} indent={newIndent} />
			{/if}
		{/each}
	</svelte:fragment>

	<svelte:fragment slot="bracketClose">
		{']'}
	</svelte:fragment>

	<svelte:fragment slot="compressed">
		...{input.length}...
	</svelte:fragment>
</Base>
