<script lang="ts">
	import { onMount } from 'svelte';

	interface Theme {
		name: string;
		color: string;
		pallet: {
			'bg-color': string;
			'accent-color': string;
			'accent-color-light': string;
			'string-color': string;
			'hyperlink-color': string;
			'number-color': string;
			'boolean-color': string;
			'label-color': string;
			'null-color': string;
			'bracket-color': string;
			'--text-color': string;
		};
	}

	const themes: Theme[] = [
		{
			name: 'dracula',
			color: '#1e1e1e',
			pallet: {
				'bg-color': '#1e1e1e',
				'accent-color': '#00cc7d',
				'accent-color-light': '#00cc7e69',
				'string-color': '#d69d85',
				'hyperlink-color': '#d69d85',
				'number-color': '#b5cea8',
				'boolean-color': '#4ec9b0',
				'label-color': '#569cd6',
				'null-color': '#7d8c93',
				'bracket-color': '#ffffff',
				'--text-color': '#3c3c3c'
			}
		},

		{
			name: 'blush',
			color: '#e1b01b',
			pallet: {
				'bg-color': '#f5f5f5',
				'accent-color': '#e1b01b',
				'accent-color-light': '#00cc7e69',
				'string-color': '#ec8022',
				'hyperlink-color': '#ec8022',
				'number-color': '#284e3e',
				'boolean-color': '#4788d2',
				'label-color': '#569cd6',
				'null-color': '#7d8c93',
				'bracket-color': '#000000',
				'--text-color': '#3c3c3c'
			}
		}
	];

	let activeTheme = themes[0].name;

	function changeTheme(theme: Theme) {
		if (chrome?.storage) {
			chrome?.storage?.sync.set({ pallet: theme }, () => {
				activeTheme = theme.name;
			});
		} else {
			activeTheme = theme.name;
		}
	}

	onMount(() => {
		if (chrome?.storage) {
			chrome.storage.sync.get(['pallet'], (t) => {
				if (!t || !t.pallet) {
					return;
				}
				activeTheme = t.pallet.name;
			});
		}
	});
</script>

<div id="seven-json-viewer-popup">
	<header>
		<div class="icon" />
		<div class="header-content">
			<h1>Seven JSON Viewer</h1>
			<h3>Minimal JSON Viewer with JSON Path</h3>
		</div>
	</header>

	<div class="row theme">
		<p>Theme</p>
		<div class="color-pallets">
			<ul>
				{#each themes as theme (theme.name)}
					<li>
						<button
							class={'color-circle ' + (activeTheme === theme.name ? 'active' : '')}
							style="--bg-color: {theme.color}"
							on:click={() => changeTheme(theme)}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="row history">
		<!-- <div class="heading">
			<p>History (Coming Soon)</p>
			<div class={'toggle ' + (isHistoryEnabled ? 'on' : 'off')} onClick={toggleHistory}>
				{isHistoryEnabled ? 'on' : 'off'}
			</div>
		</div> -->

		<!-- <div class="item-container">
        <ul class="history-list">
          {history.map((i, _) => (
            <li class="history-item" key={_}>
              <div class="icon"></div>
              <p>JSON Text</p>
              <div class="actions">
                <a class="bookmark active ">
                  <BookmarkIcon></BookmarkIcon>
                </a>
                <a class="delete warn">
                  <DeleteIcon></DeleteIcon>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div> -->
	</div>

	<footer>
		<a href="https://json.reez.dev/#feedback">Send Feedback</a>
		<a href="https://github.com/reezpatel/seven-json-viewer">Github</a>
	</footer>
</div>

<style lang="scss">
	* {
		font-family: 'Lato', sans-serif;
		margin: 0;
		padding: 0;
		color: #6a677f;
		font-size: 14px;
	}

	body,
	#seven-json-viewer-popup {
		width: 380px;
		background-color: white;
	}

	header {
		height: 64px;
		display: flex;
		border-bottom: 1px solid #e7e7e9;
		padding: 0 15px;
		align-items: center;

		.icon {
			background-image: url('../public/assets/icon-48.png');
			height: 42px;
			width: 42px;
			background-size: cover;
		}

		.header-content {
			flex-grow: 1;
			padding: 15px;

			h1 {
				font-size: 16px;
				margin-bottom: 2px;
				font-weight: bold;
			}

			h3 {
				font-size: 13px;
			}
		}
	}

	ul {
		list-style: none;
		display: flex;
	}

	.theme {
		display: flex;
		padding: 0 15px;
		margin-top: 15px;
		gap: 8px;
		flex-direction: column;

		p {
			line-height: 15px;
			font-weight: bold;
			font-size: 16px;
		}

		.color-pallets {
			ul {
				gap: 15px;
				align-items: center;

				li {
					display: flex;
					align-items: center;
				}
			}

			button {
				width: 18px;
				height: 18px;
				display: inline-block;
				border-radius: 100px;
				cursor: pointer;
				border: 2px solid white;
				box-shadow: 0px 0px 2px 0px;
				background-color: var(--bg-color);

				&.active {
					box-shadow: 0px 0px 2px 1px;
				}
			}
		}
	}

	.history {
		margin-top: 15px;
		padding: 0 15px;

		.heading {
			display: flex;
			justify-content: space-between;
			align-items: center;

			p {
				line-height: 15px;
				font-size: 16px;
				font-weight: bold;
			}

			.toggle {
				cursor: pointer;
				padding: 5px 10px;
				border-radius: 4px;
				font-weight: bold;
				text-transform: uppercase;

				&.on {
					color: #69ae84;
					background-color: #d8ebe0;

					&:hover {
						color: #d8ebe0;
						background-color: #69ae84;
					}
				}

				&.off {
					color: #f4837d;
					background-color: #facdcb;

					&:hover {
						color: #facdcb;
						background-color: #f4837d;
					}
				}
			}
		}
	}

	.item-container {
		.history-list {
			display: flex;
			gap: 8px;
			flex-direction: column;
			margin-top: 15px;

			.history-item {
				display: flex;
				align-items: center;

				.icon {
					width: 25px;
					height: 25px;
					background-color: rgb(238, 238, 238);
					background-image: url('../public/assets/icon-48.png');
					background-size: cover;
				}

				p {
					flex-grow: 1;
					padding: 0 15px;
				}
			}

			.actions {
				display: flex;
				gap: 15px;

				a {
					cursor: pointer;

					svg {
						height: 18px;
						fill: rgb(238, 238, 238);
					}

					&:hover {
						svg {
							fill: rgb(200, 200, 200);
						}
					}

					&.active {
						svg {
							fill: #58cbfd;
						}
					}

					&.warn {
						svg {
							fill: #e6394d;
						}
					}
				}
			}
		}
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #e7e7e9;
		margin-top: 15px;
		padding: 10px 15px;

		a {
			text-decoration: underline;
			font-size: 12px;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
				text-decoration-style: dotted;
			}
		}
	}
</style>
