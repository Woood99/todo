import {
    getTomorrowDay,
    getCurrentDateString,
    getFormatDate,
    isDateInCurrentWeek,
    convertDateFromDDMM,
    isDateInCurrentMonth,
    isDateInCurrentYear,
    getStartOfWeek,
    getEndtOfWeek,
    getCurrentYear
} from "../modules/date.js";

import dynamicModal from "../modules/dynamicModal.js";
import datePicker from '../modules/datePicker.js';
import { textareaPrimary } from "../modules/textarea.js";

document.addEventListener('DOMContentLoaded', () => {
    class Todo {
        constructor() {
            this.tabs = document.querySelector('[data-todo-tabs]').wdTab;
            if (!this.tabs) return;
            this.tabsEl = this.tabs.container;
            this.actionTasks = new ActionTasks();
            this.init();

            this.textStub = {
                'today': 'Задач на сегодня нет!',
                'tomorrow': 'Задач на завтра нет!',
                'week': 'Задач на эту неделю нет!',
                'month': 'Задач на этот месяц нет!',
                'year': 'Задач на этот год нет!',
                'other': 'Задач нет!',
                'all': 'Задач нет!',
            };
        }

        init() {
            this.changed();
            this.tabsEl.addEventListener('tabChange', this.changed.bind(this));
            this.tabsEl.addEventListener('click', this.deleteTask.bind(this));
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (target.closest('[data-create-modal-task]')) {
                    this.createModal();
                }
                if (target.closest('[data-edit-modal-task]')) {
                    this.createModal(target.closest('[data-card-id]') ? target.closest('[data-card-id]').dataset.cardId : null);
                }
            });
        }


        async changed(loaderCreate = true) {
            const todoActiveTab = this.tabs.activeTab;
            const todoPanel = this.tabs.activePanel;

            if (loaderCreate) {
                todoPanel.innerHTML = '';
                new Loader(todoPanel).create()
            }
            this.tabsEl.classList.add('_loader');
            this.tabsEl.classList.add('_stub');

            const data = await this.actionTasks.fetchTasks();
            new Loader(todoPanel).hide();

            const nameTab = todoActiveTab.dataset.tabName;
            let newData = {};
            if (nameTab === 'today') {
                newData.data = sortByToday(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи на сегодня 
                    <span class="text-sm text-gray-400">${getCurrentDateString(new Date())}<span>
                    `;
                }
            }
            if (nameTab === 'tomorrow') {
                newData.data = sortByTomorrow(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи на завтра 
                    <span class="text-sm text-gray-400">${getCurrentDateString(getTomorrowDay(new Date()))}<span>
                    `;
                }
            }
            if (nameTab === 'week') {
                newData.data = sortByWeek(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи на неделю 
                    <span class="text-sm text-gray-400">${getCurrentDateString(getStartOfWeek())} — ${getCurrentDateString(getEndtOfWeek())}<span>
                    `;
                }
            }
            if (nameTab === 'month') {
                newData.data = sortByMonth(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи на месяц 
                    <span class="text-sm text-gray-400">${getFormatDate(new Date(),'mm,yyyy')}<span>
                    `;
                }
            }
            if (nameTab === 'year') {
                newData.data = sortByYear(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи на год 
                    <span class="text-sm text-gray-400">${getCurrentYear()}<span>
                    `;
                }
            }
            if (nameTab === 'other') {
                newData.data = sortByOther(data);
                if (newData.data.length > 0) {
                    newData.title = `Задачи без конкретной даты`;
                }
            }
            if (nameTab === 'all') {
                newData.data = allTasks(data);
                if (newData.data.length > 0) {
                    newData.title = `Все задачи`;
                }
            }


            this.tabsEl.classList.remove('_loader');
            if (newData.data && newData.data.length > 0) {
                renderPosts.call(this, newData);
                this.tabsEl.classList.remove('_stub');
            } else {
                renderStub.call(this);
            }


            function renderStub() {
                const nameTab = todoActiveTab.dataset.tabName;
                if (!nameTab) return;
                todoPanel.innerHTML = `
                    <span class="text-center block mt-[40px] text-2xl">${this.textStub[nameTab]}</span>
                    <button type="button" class="btn btn-reset ml-auto mr-auto mt-6 btn-primary" data-create-modal-task>
                        <span class="btn-primary__text">
                            Добавить задачу
                        </span>
                    </button>
                `;
            }

            function renderPosts(currentData) {
                const data = currentData.data;
                const html = data.map(item => {
                    return `
                    <article class="bg-white rounded-2xl flex flex-col text-black py-6 px-8" data-card-id="${item.id}">
                        <div class="flex gap-4 items-center justify-between pb-4 mb-6 border-gray-200 border-b md1:flex-col md1:items-start md1:gap-3 md1:mb-4">
                            <p class="font-medium">${item.name}</p>
                            <div class="flex items-center gap-5">
                                ${item.date ? `<time class="text-md whitespace-nowrap">${getFormatDate(item.date)}</time>` : '<span></span>'}
                                ${item.date ? `<time class="text-xs text-gray-400 whitespace-nowrap">${item.date}</time>` : ''}
                            </div>
                        </div>
                        <div class="flex items-center justify-between md1:flex-col md1:items-start md1:gap-4">
                            <div class="flex-grow max-w-[80%] text-gray-500 whitespace-pre-wrap md1:max-w-full">${item.descr}</div>
                            <div class="flex items-center gap-4 self-end">
                                <button type="button" data-tooltip-html="Редактировать задачу" data-tooltip-desktop data-edit-modal-task>
                                    <svg class="w-6 h-6 pointer-events-none" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill="none"><path d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67" class="cls-1" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#5478e6;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"/><path d="m195.656 33.271-52.882 52.882" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#5478e6;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;   stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"/></svg>                     
                                </button>
                                <button type="button" data-tooltip-html="Удалить задачу" data-tooltip-desktop data-button-delete-task>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>                          
                                </button>
                            </div>
                        </div>
                    </article>
                `;
                })
                todoPanel.insertAdjacentHTML('beforeend', `
                    ${`<h2 class="mb-5 text-2xl">${currentData.title}</h2>`}
                    <div class="flex flex-col gap-4">${html.join('')}</div>
                `);
            }

        }

        async deleteTask(e) {
            const target = e.target;
            const button = target.closest('[data-button-delete-task]');
            if (!button) return;
            this.deleteTooltips();
            this.tabs.activePanel.innerHTML = '';
            this.tabsEl.classList.add('_loader');
            new Loader(this.tabs.activePanel).create();

            const currentID = button.closest('[data-card-id]').dataset.cardId;
            await this.actionTasks.deleteTask(currentID);
            this.changed(false);
        }

        async editTask(data, modal, form, key) {
            new Loader(form).createWithWrapper()
            await this.actionTasks.editTask(data, key);
            new Loader(form).hide()
            this.changed();
            modal.close();
        }


        async createTask(data, modal, form) {
            new Loader(form).createWithWrapper()
            await this.actionTasks.createTask(data);
            new Loader(form).hide()
            this.changed();
            modal.close();
        }

        getContainerFromInput(el) {
            return el.closest('.input-primary');
        }

        deleteTooltips() {
            document.querySelectorAll('.tooltip-html').forEach(item => item.remove());
        }


        async createModal(key) {
            const dataItem = key ? await this.actionTasks.fetchTaskById(key) : null;
            const modalContentHTML = `
            <div class="modal edit-task _center">
                <div class="modal__container edit-task__container">
                    <button type="button" class="btn btn-reset modal__close edit-task__close js-modal-close">
                        <svg>
                            <use xlink:href="./img/sprite.svg#close"></use>
                        </svg>
                    </button>
                    <div class="modal__content edit-task__content">
                    <form action="#" class="create-task">
                    <label class="input-primary">
                        <input type="text" name="Имя" class="input-reset input-primary__input" value="${dataItem && dataItem.name !== 'Без названия' ? dataItem.name : ''}" data-field-name placeholder="Название">
                    </label>
                    <div class="textarea-primary mt-2 md1:max-h-[285px]" data-textarea-min-height='80'>
                        <textarea class="input-reset textarea-primary__textarea" maxlength='1000' data-field-descr placeholder="Описание">${dataItem && dataItem.descr ? dataItem.descr : ''}</textarea>
                    </div>
                    <label class="input-primary mt-2">
                        <input type="text" name="Имя" class="input-reset input-primary__input" value="${dataItem && dataItem.date ? dataItem.date : ''}" data-field-date placeholder="Дата">
                    </label>
                    <div class="mt-4 grid grid-cols-2 gap-4 md1:grid-cols-1">
                        <label class="checkbox">
                            <input type="checkbox" name="checkbox" class="input-reset checkbox__field" data-checkbox-date='today'>
                            <div class="checkbox__checkmark">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#check"></use>
                                </svg>
                            </div>
                            <span class="checkbox__content">
                                Сегодня
                            </span>
                        </label>
                        <label class="checkbox order-1">
                            <input type="checkbox" name="checkbox" class="input-reset checkbox__field" data-checkbox-date='year'>
                            <div class="checkbox__checkmark">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#check"></use>
                                </svg>
                            </div>
                            <span class="checkbox__content">
                                Год
                            </span>
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" name="checkbox" class="input-reset checkbox__field" data-checkbox-date='tomorrow'>
                            <div class="checkbox__checkmark">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#check"></use>
                                </svg>
                            </div>
                            <span class="checkbox__content">
                                Завтра
                            </span>
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" name="checkbox" class="input-reset checkbox__field" data-checkbox-date='all'>
                            <div class="checkbox__checkmark">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#check"></use>
                                </svg>
                            </div>
                            <span class="checkbox__content">
                                Без ограничений
                            </span>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-reset btn-primary w-full mt-8">
                        <span class="btn-primary__text">
                            Сохранить
                        </span>
                    </button>
                    </form>
                    </div>
                </div>
            </div>
            `;
            const modal = new dynamicModal(modalContentHTML, '.edit-task', {
                isOpen(modal) {
                    setTimeout(() => {
                        textareaPrimary(modal.modal.querySelector('[data-field-descr]').parentElement)
                    }, 300);
                }
            });

            const form = modal.modal.querySelector('.create-task');
            const checkboxes = form.querySelectorAll('[data-checkbox-date]');
            const date = form.querySelector('[data-field-date]');
            const name = form.querySelector('[data-field-name]');
            const descr = form.querySelector('[data-field-descr]');

            datePicker(date.parentElement, date);


            checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxHandler))

            function checkboxHandler() {
                const name = this.dataset.checkboxDate;

                checkboxes.forEach(checkbox => {
                    if (this !== checkbox) checkbox.checked = false;
                });
                date.datePicker.clear();
                if (this.checked) {
                    date.setAttribute('disabled', '');

                    if (name === 'today') {
                        date.datePicker.selectDate(new Date());
                    }
                    if (name === 'tomorrow') {
                        date.datePicker.selectDate(getTomorrowDay(new Date()));
                    }
                    if (name === 'year') {
                        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
                        date.datePicker.selectDate(lastDayOfYear);
                    }
                } else {
                    date.removeAttribute('disabled');
                }
            }
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    name: name.value || 'Без названия',
                    descr: descr.value || '',
                    date: date.value || null
                }
                if (key) {
                    this.editTask(data, modal, form, key);
                } else {
                    this.createTask(data, modal, form);
                }
            })

            return modal;
        }

    }

    new Todo();
});


class ActionTasks {
    constructor() {
        this.url = 'https://todo-61c91-default-rtdb.firebaseio.com/';
    }

    async createTask(post) {
        try {
            const request = new Request(`${this.url}/tasks.json`, {
                method: 'post',
                body: JSON.stringify(post)
            });
            return this.useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }
    async editTask(post, key) {
        try {
            const request = new Request(`${this.url}/tasks/${key}.json`, {
                method: 'Put',
                body: JSON.stringify(post)
            });
            return this.useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchTasks() {
        try {
            const request = new Request(`${this.url}/tasks.json`, {
                method: 'get'
            });
            return this.useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchTaskById(id) {
        try {
            const request = new Request(`${this.url}/tasks/${id}.json`, {
                method: 'get'
            });
            return this.useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id) {
        try {
            const request = new Request(`${this.url}/tasks/${id}.json`, {
                method: 'DELETE'
            });
            return this.useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }

    async useRequest(request) {
        const response = await fetch(request)
        return await response.json();
    }
}


class Loader {
    constructor(target, path) {
        this.el = target;
        this.path = path || 'beforeend';
        if (!this.el) return;
        this.loader = this.el.querySelector('.loader-wrapper') || this.el.querySelector('.loader') || null;
    }

    createWithWrapper() {
        if (this.loader) return;
        this.el.insertAdjacentHTML(this.path, `
            <div class="loader-wrapper">
                <span class="loader"></span>
            </div>
        `);
    }
    create() {
        if (this.loader) return;
        this.el.insertAdjacentHTML(this.path, `
            <span class="loader"></span>
        `);
    }

    hide() {
        if (!this.loader) return;
        this.loader.remove();
    }
}

function sortByToday(data) {
    const currentDate = getCurrentDateString(new Date());
    const result = [];
    for (const item in data) {
        if (data[item].date === currentDate) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByTomorrow(data) {
    const currentDate = getCurrentDateString(getTomorrowDay(new Date()));
    const result = [];
    for (const item in data) {
        if (data[item].date === currentDate) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByOther(data) {
    const result = [];
    for (const item in data) {
        if (!data[item].date) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByWeek(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentWeek(new Date(convertDateFromDDMM(data[item].date)))) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByMonth(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentMonth(new Date(convertDateFromDDMM(data[item].date)))) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByYear(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentYear(new Date(convertDateFromDDMM(data[item].date)))) {
            data[item].id = item;
            result.push(data[item]);
        }
    }
    return result;
}



function allTasks(data) {
    const result = [];
    for (const item in data) {
        data[item].id = item;
        result.push(data[item]);
    }
    return result;
}