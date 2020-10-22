import App from '~/App.svelte';
import { token } from './stores'

const app = new App({
  target: document.body,
  // hydrate: true,
  props: {
    appName: 'Omflow Yoga',
    token: token
  },
});

window.app = app;

export default app;
