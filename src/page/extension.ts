import JSONViewer from "../lib/json-viewer/index.svelte";
import { data } from "../data/test.data";

new JSONViewer({
  target: document.body,
  props: {
    json: data,
  },
});
