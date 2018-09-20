import * as React from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import 'antd/dist/antd.less';
import App from './App';


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

import('antd/lib/locale-provider/en_US').then((locale) => {
    render (
        <LocaleProvider locale={locale.default}>
            <App />
        </LocaleProvider>, 
        document.getElementById('app'),
    );
});