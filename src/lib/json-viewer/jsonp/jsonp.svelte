<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '../../../utils/click.outside';
	import jp from 'jsonpath';

	const dispatch = createEventDispatcher();

	export let json = {};

	let hasError = false;
	let popup = false;
	let message = '';
	let timer: NodeJS.Timer;

	function onInput(e: any) {
		let str = e.target.value;

		hasError = false;

		try {
			if (!str) {
				dispatch('update', json);
			} else {
				dispatch('update', jp.query(json, str));
			}
		} catch {
			hasError = true;
		}
	}

	function showMessage(str = '') {
		if (timer) {
			clearTimeout(timer);
		}

		if (message) {
			message = '';

			timer = setTimeout(() => {
				message = str;
			}, 200);

			timer = setTimeout(() => {
				message = '';
			}, 4000);
		} else {
			message = str;

			timer = setTimeout(() => {
				message = '';
			}, 4000);
		}
	}

	function copy() {
		const str = JSON.stringify(json);

		let copyInput = document.getElementById('input') as HTMLInputElement;

		if (!copyInput) {
			copyInput = document.createElement('input');
		}

		copyInput.value = str;

		copyInput.select();
		copyInput.setSelectionRange(0, 99999);

		navigator.clipboard.writeText(copyInput.value);

		popup = false;
		showMessage('Copied!');
	}

	function save() {
		// popup = false;
		// showMessage('Saved, Check extension panel!');
	}
</script>

<footer use:clickOutside on:click_outside={() => (popup = false)}>
	<input on:input={onInput} placeholder="$.theater[*].movies" />

	<div class="toolbar">
		{#if message}
			<p transition:fly={{ y: 60, duration: 300 }} class="message">{message}</p>
		{/if}
		<div class="options">
			<div class="popup" class:visible={popup}>
				<button on:click={copy}>
					<span>&#x262F;</span>
					<p>Copy JSON</p>
				</button>
				<button>
					<span>&#x2756;</span>
					<p>Compare <span>SOON!</span></p>
				</button>
				<button>
					<span>&#x270E;</span>
					<p>Edit <span>SOON!</span></p>
				</button>
				<button on:click={save}>
					<span>&#x2726;</span>
					<p>Save for later <span>SOON!</span></p>
				</button>
			</div>
			<button on:click={() => (popup = !popup)}>&#9776;</button>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		height: 54px;
		background-color: var(--accent-color);
		display: flex;
		align-items: center;
		padding: 0 25px;

		input {
			width: 100%;
			background-color: transparent;
			outline: none;
			color: var(--text-color);
			font-size: 14px;
			border: none;

			&::placeholder {
				color: var(--text-color);
			}
		}
	}

	.toolbar {
		display: flex;
		align-items: center;

		p.message {
			color: var(--text-color);
			margin-right: 10px;
			white-space: nowrap;
		}
	}

	.options {
		position: relative;

		button {
			background-color: transparent;
			outline: none;
			border: none;
			font-size: 28px;
			color: var(--text-color);
			cursor: pointer;
		}

		.popup {
			position: absolute;
			background: var(--bg-color);
			border: 1px solid var(--accent-color);
			padding: 15px 20px;
			right: 0;
			border-radius: 8px;
			transform: translateY(-120%) translateX(100vh);
			opacity: 0;
			transition: opacitiy 0.3s ease, transform 0s ease 0.3s;
			display: grid;
			grid-template-columns: 1fr;
			row-gap: 8px;

			&.visible {
				transition: opacitiy 0.3s ease, transform 0s ease 0s;
				opacity: 1;
				transform: translateY(-120%) translateX(0);
			}

			button {
				display: flex;
				align-items: center;

				&:hover {
					filter: brightness(1.2);
				}

				span {
					color: var(--string-color);
				}

				p {
					white-space: nowrap;
					margin-left: 20px;
					color: var(--primary-color);

					span {
						font-size: 10px;
						background-color: var(--bracket-color);
						color: var(--text-color);
						padding: 0 7px;
						border-radius: 2px;
						display: inline-block;
						margin-left: 8px;
					}
				}
			}
		}
	}
</style>
