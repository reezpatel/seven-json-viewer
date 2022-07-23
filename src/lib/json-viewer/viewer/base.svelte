<script>
	export let label = '';
	export let indent = 0;
	export let canToggle = false;

	let showContent = true;

	function toggle() {
		showContent = !showContent;
	}
</script>

<div class="block" style="--indent=${indent}">
	{#if canToggle}
		<button class:open={showContent} on:click={toggle}>&#9660;</button>
	{/if}

	<p>
		{#if label}
			<span class="name">
				{label}:
			</span>
		{/if}
		{#if $$slots.bracketOpen}
			<span class="bracket">
				<slot name="bracketOpen" />
			</span>
		{/if}
		{#if !showContent}
			<slot name="compressed" />

			{#if $$slots.bracketClose}
				<span>
					<slot name="bracketClose" />
				</span>
			{/if}
		{/if}
	</p>

	{#if showContent}
		<slot name="content" />

		{#if $$slots.bracketClose}
			<p class="bracket">
				<slot name="bracketClose" />
			</p>
		{/if}
	{/if}
</div>

<style lang="scss">
	.block {
		position: relative;
		padding-left: 27px;

		button {
			outline: none;
			border: none;
			position: absolute;
			background-color: transparent;
			color: var(--primary-color);
			transform: rotate(-90deg);
			left: 5px;
			font-size: 18px;
			cursor: pointer;
			transition: transform 0.3s ease;

			&.open {
				transform: rotate(0deg);
			}
		}

		.bracket {
			color: var(--bracket-color);
		}

		p {
			display: inline-block;
		}

		.name {
			color: var(--label-color);
		}
	}
</style>
