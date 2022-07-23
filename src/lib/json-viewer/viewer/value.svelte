<script>
	import ArrayComponent from './array.svelte';
	import Base from './base.svelte';

	export let input = '';
	export let label = '';
	export let indent = 0;

	let inputWithUrl = '';

	const URL_REGEX =
		/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gim;

	if (typeof input === 'string' && input.match(URL_REGEX)) {
		inputWithUrl = input.replace(URL_REGEX, '<a href="$&" target="_blank" rel="nofollow">$&</a>');
	}
</script>

<Base {label} {indent} canToggle={false}>
	<svelte:fragment slot="content">
		{#if input === null}
			<p class="null">null</p>
		{:else if typeof input === 'boolean'}
			<p class="boolean">{input}</p>
		{:else if typeof input === 'number'}
			<p class="number">{input}</p>
		{:else if inputWithUrl}
			<p class="string">"{@html inputWithUrl}"</p>
		{:else}
			<p class="string">"{input}"</p>
		{/if}
	</svelte:fragment>
</Base>

<style lang="scss">
	p {
		display: inline-block;

		&.null {
			color: var(--null-color);
		}

		&.boolean {
			color: var(--string-color);
		}

		&.number {
			color: var(--number-color);
		}

		&.string {
			color: var(--string-color);
		}

		:global {
			a {
				color: var(--hyperlink-color);
				text-underline-offset: 2px;
			}
		}
	}
</style>
