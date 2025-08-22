import { render } from 'preact';
import { App } from './src/components/App';

document.title = import.meta.env.VITE_APP_NAME;

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}

render(<App />, document.getElementById('app'));