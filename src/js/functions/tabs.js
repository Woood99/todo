import {
    _displayFadeDown
} from "../modules/slide.js";

export default function WdTab(element) {
    if (!element) return;
    element.wdTab = new Tabs(element);
}

class Tabs {
    constructor(container) {
        this.container = container;
        this.buttonsList = this.container.querySelector('[data-tabs-buttons]');
        this.content = this.container.querySelector('[data-tabs-content]');
        this.buttons = Array.from(this.buttonsList.querySelectorAll('.tabs__button'));
        this.tabsOne = this.container.hasAttribute('data-tabs-one') || null;
        this.panels = Array.from(this.content.children);
        this.animation = this.container.dataset.tabsAnimation || null;
        this.navLine = this.container.querySelector('[data-nav-line]') || null;

        this.activeTab = null;
        this.activePanel = null;

        if (this.tabsOne) {
            this.init(true);
            return;
        }

        if (!this.tabsOne && this.buttons.length !== this.panels.length) {
            this.errorLength();
            return;
        }

        this.init(false);
    }

    init(tabOneStatus) {
        this.setIndex();
        this.container.classList.add('_init-tab');

        this.activeTab = this.buttons.find(button => button.classList.contains('_active')) || null;
        if (tabOneStatus) {

            if (this.activeTab) {
                this.setNav(this.getIndexButton(this.activeTab));
            } else {
                this.setNav(0);
            }
            // this.setTab(0);

        } else {

            if (this.activeTab) {
                this.setTab(this.getIndexButton(this.activeTab));
            } else {
                this.setTab(0);
            }

        }



        this.change();
        this.buttonsList.addEventListener('click', (e) => {
            const target = e.target;
            const button = target.closest('[data-tabs-button-index]');
            if (!button) return;
            const index = this.getIndexButton(button);
            if (tabOneStatus) {
                this.setNav(index);
            } else {
                this.setTab(index);
            }
            this.change();
        })
    }

    setIndex() {
        this.buttons.forEach(setIndexButtons);
        this.panels.forEach(setIndexPanels);

        function setIndexButtons(button, index) {
            button.setAttribute('data-tabs-button-index', index);
        }

        function setIndexPanels(panel, index) {
            panel.setAttribute('data-tabs-panel-index', index);
        }
    }

    change() {
        this.container.dispatchEvent(new Event('tabChange'));
    }

    setNav(index) {
        const button = this.buttons.find(button => this.getIndexButton(button) == index);
        if (this.tabsOne) {
            this.clearActiveTab();
            this.clearNav();
            this.activePanel = this.panels[0];
        } else {
            this.clearTabs();
        }
        this.activeTab = button;

        button.classList.add('_active');
        if (this.animation === 'fade') {
            if (this.tabsOne) {
                this.activePanel.style.opacity = 0;
                setTimeout(() => _displayFadeDown(this.activePanel, 500), 0);
            } else {
                _displayFadeDown(this.activePanel, 500);
            }
        } else {
            this.activePanel.removeAttribute('hidden');
        }

        if (this.navLine) {
            this.navLineChanged();
        }
    }

    setTab(index) {
        const panel = this.panels.find(panel => this.getIndexPanel(panel) == index);
        if (panel.classList.contains('_slide')) return;
        this.clearTabs();

        this.activePanel = panel;
        this.setNav(index);
    }

    clearTabs() {
        this.clearActiveTab();
        this.clearNav();
        this.clearPanels();
    }

    clearActiveTab() {
        this.activeTab = null;
    }

    clearNav() {
        this.buttons.forEach(button => button.classList.remove('_active'));
    }

    clearPanels() {
        this.panels.forEach(panel => panel.setAttribute('hidden', ''));
    }

    getIndexButton(button) {
        if (!button) return;
        return button.dataset.tabsButtonIndex;
    }

    getIndexPanel(panel) {
        if (!panel) return;
        return panel.dataset.tabsPanelIndex;
    }

    errorLength() {
        console.error(`У класса Tab количество кнопок и панелей не равно!`, this);
    }

    navLineChanged() {
        this.navLine.style.width = `${this.activeTab.offsetWidth}px`;
        this.navLine.style.left = `${this.activeTab.offsetLeft}px`;
    }

}

// const tabs = document.querySelectorAll('[data-tabs]');
// tabs.forEach(tab => WdTab(tab));


/* <div class="tabs" data-tabs>
<nav data-tabs-buttons class="tabs__nav">
    <button type="button" class="tabs__button">
        tab 1
    </button>
    <button type="button" class="tabs__button">
        tab 2
    </button>
    <button type="button" class="tabs__button">
        tab 3
    </button>
</nav>
<div data-tabs-content class="tabs__content">
    <div class="tabs__panel" hidden>
        content 1
    </div>
    <div class="tabs__panel" hidden>
        content 2
    </div>
    <div class="tabs__panel" hidden>
        content 3
    </div>
</div>
</div> */