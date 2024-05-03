export default class dynamicModal {
    constructor(html, selector,options) {
        this.html = html;
        this.selector = selector;
        this.isOpen = false;
        this.body = document.body;
        this.speed = 300;
        this.animation = 'fade';
        this.scrollValue = document.querySelector('.page__body').classList.contains('dis-scroll') ? true : false;
        this._focusElements = [
            'a[href]',
            'input',
            'select',
            'textarea',
            'button',
            'iframe',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        this._fixBlocks = document.querySelectorAll('.fix-block');
        this.previousActiveElement = null;
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
        }
        this.options = Object.assign(defaultOptions, options);
        if (document.querySelector(this.selector) || !this.html) return;
        this.init();
    }

    init() {
        document.body.insertAdjacentHTML('beforeend', this.html);
        this.modal = document.querySelector(this.selector);
        if (!this.modal) return;
        this.modalContainer = this.modal.querySelector(`${this.selector}__container`);
        if (!this.modalContainer) return;
        setTimeout(() => {
            this.open();
        }, 1);
        this.events();
    }

    events() {
        this.modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.js-modal-close')) {
                this.close();
            }
            if (target.classList.contains(this.selector.replace(/^\./, ""))) {
                this.close();
            }
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                this.close();
            }
            if (e.which == 9 && this.isOpen) {
                this.focusCatch(e);
            }
        })
    }

    open() {
        if (!this.isOpen) {
            this.options.isOpen(this);
            if (!this.previousActiveElement) {
                this.previousActiveElement = document.activeElement;
            }
            this.modalContainer.scrollTo(0, 0);
            this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
            this.modal.classList.add('is-open');
            if (!this.scrollValue) {
                this.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
                this.disableScroll();
            }
            this.modalContainer.classList.add('modal-open');
            this.modalContainer.classList.add(this.animation);
            setTimeout(() => {
                this.modalContainer.classList.add('animate-open');
                this.isOpen = true;
                this.focusTrap();
            }, this.speed);
        }
    }

    close() {
        if (this.isOpen) {
            this.modalContainer.classList.remove('animate-open');
            this.modalContainer.classList.remove(this.animation);
            this.modal.classList.remove('is-open');
            this.modalContainer.classList.remove('modal-open');

            if (!this.scrollValue) {
                this.enableScroll();
                this.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
            }

            this.options.isClose(this);
            setTimeout(() => {
                this.modal.remove();
            }, this.speed);
            this.isOpen = false;
            this.focusTrap();
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        this.body.classList.add('dis-scroll');
        this.body.dataset.position = pagePosition;
        this.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
        let pagePosition = parseInt(this.body.dataset.position, 10);
        this.unlockPadding();
        this.body.style.top = 'auto';
        this.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        this.body.removeAttribute('data-position');
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - this.body.offsetWidth + 'px';
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        this.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        this.body.style.paddingRight = '0px';
    }

    focusCatch(e) {
        const nodes = this.modal.querySelectorAll(this._focusElements);
        const nodesArray = Array.prototype.slice.call(nodes);
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (e.shiftKey && focusedItemIndex === 0) {
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            nodesArray[0].focus();
            e.preventDefault();
        }
    }

    focusTrap() {
        if (this.isOpen) {
            const nodes = this.modal.querySelectorAll(this._focusElements);
            if (nodes.length) nodes[0].focus();
        } else {
            this.previousActiveElement.focus();
            this.previousActiveElement = null;
        }
    }
}