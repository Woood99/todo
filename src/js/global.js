import 'focus-visible';
import './functions/fix-fullheight.js';
import './_settings.js';

import datePickers from './functions/datePickers.js';
import WdTab from './functions/tabs.js';
import Modal from './functions/modal.js';

import Tooltip from './functions/tooltip.js'
import {textareaPrimary} from './functions/textarea.js';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const target = e.target;
    })

    datePickers();

    const tabs = document.querySelectorAll('[data-tabs]');
    tabs.forEach(tab => WdTab(tab));

    const modalSettings = {};
    const modal = new Modal(modalSettings);

    document.querySelectorAll('.textarea-primary').forEach(item => textareaPrimary(item));

    const tooltipHtml = new Tooltip({
        mode: 'html',
        gap: 10,
        targetSelector: '[data-tooltip-html]',
        elementSelector: 'tooltip-html',
        positionY: 'bottom',
        positionX: 'center',
        animation: {
            type: 'fade',
            speed: 300,
        },
    });
});