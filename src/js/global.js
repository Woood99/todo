import 'focus-visible';
import './functions/fix-fullheight.js';
import './_settings.js';

import datePickers from './functions/datePickers.js';
import WdTab from './functions/tabs.js';
import Modal from './functions/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const target = e.target;
    })

    datePickers();

    const tabs = document.querySelectorAll('[data-tabs]');
    tabs.forEach(tab => WdTab(tab));

    const modalSettings = {};
    const modal = new Modal(modalSettings);
});