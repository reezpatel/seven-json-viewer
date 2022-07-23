<script lang="ts">
  import { onMount } from "svelte";

  import Jsonp from "./jsonp/jsonp.svelte";
  import Viewer from "./viewer/viewer.svelte";

  export let json = {};
  let updatedValue: any;

  onMount(async () => {
    chrome.storage?.sync.get(["pallet"], ({ pallet: theme }) => {
      if (!theme || !theme.pallet) {
        return;
      }

      Object.keys(theme.pallet).forEach((name) => {
        const color = theme.pallet[name];
        document.documentElement.style.setProperty(`--${name}`, color);
      });
    });
  });
</script>

<div class="svelte-wrapper">
  <div class="viewer">
    <Viewer input={updatedValue || json} />
  </div>
  <div class="footer">
    <Jsonp on:update={(e) => (updatedValue = e.detail)} {json} />
  </div>
</div>

<style lang="scss">
  .svelte-wrapper {
    overflow: hidden;
    background-color: var(--bg-color);
    height: 100vh;
    width: 100vw;
    color: var(--bracket-color);

    display: flex;
    flex-direction: column;
  }

  .viewer {
    padding: 15px;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .footer {
    flex: 0 0 auto;
  }

  :global {
    @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;1,200&display=swap");

    * {
      font-family: "Source Code Pro", monospace;
      font-weight: 400;
      margin: 0;
      padding: 0;

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background-color: var(--bg-color);
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--primary-color);
        border-radius: 100px;
      }
    }

    :root {
      --bg-color: #1e1e1e;
      --primary-color: #bdc3c7;
      --accent-color: #00cc7d;
      --accent-color-light: #00cc7e69;
      --string-color: #d69d85;
      --hyperlink-color: #d69d85;
      --number-color: #b5cea8;
      --boolean-color: #4ec9b0;
      --label-color: #569cd6;
      --null-color: #7d8c93;
      --bracket-color: #ffffff;
      --text-color: #3c3c3c;
    }

    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
