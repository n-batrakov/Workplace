import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'antd/dist/antd.less';


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/offlineAccess.js')
            .then(
                (success) => {
                    console.log('ServiceWorker registration successful with scope:', success.scope);
                }, 
                (error) => {
                    console.error('ServiceWorker registration failed:\n', error);
                });
    });
}

render(<App />, document.getElementById('app'));
