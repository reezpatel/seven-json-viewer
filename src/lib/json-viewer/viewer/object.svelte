<script>
	import Base from './base.svelte';
	import ValueComponent from './value.svelte';
	import ArrayComponent from './array.svelte';

	export let input = {};
	export let label = '';
	export let indent = 0;

	$: newIndent = indent + 1;
	$: values = Object.entries(input);
</script>

<Base {label} {indent} canToggle={true}>
	<svelte:fragment slot="bracketOpen">
		{'{'}
	</svelte:fragment>

	<svelte:fragment slot="content">
		{#each values as [key, value] (key)}
			{#if Array.isArray(value)}
				<ArrayComponent label={key} input={value} indent={newIndent} />
			{:else if typeof value === 'object' && value !== null}
				<svelte:self label={key} input={value} indent={newIndent} />
			{:else}
				<ValueComponent label={key} input={value} indent={newIndent} />
			{/if}
		{/each}
	</svelte:fragment>

	<svelte:fragment slot="bracketClose">
		{'}'}
	</svelte:fragment>

	<svelte:fragment slot="compressed">
		...{values.length}...
	</svelte:fragment>
</Base>
