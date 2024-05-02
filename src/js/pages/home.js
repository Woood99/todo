import { getTomorrowDay, getCurrentDateString, getFormatDate, isDateInCurrentWeek, convertDateFromDDMM, isDateInCurrentMonth, isDateInCurrentYear,getStartOfWeek,getEndtOfWeek } from "../modules/date.js";

document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.querySelector('.modal-container');
    class Todo {
        constructor() {
            this.tabs = document.querySelector('[data-todo-tabs]').wdTab;
            if (!this.tabs) return;
            this.tabsEl = this.tabs.container;
            this.createTaskEl = document.querySelector('.create-task');
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
            this.titleTab = {
                'today': 'Задачи на сегодня',
                'tomorrow': 'Задачи на завтра',
                'week': 'Задачи на эту неделю',
                'month': 'Задачи на этот месяц',
                'year': 'Задачи на этот год',
                'other': 'Задачи без даты',
                'all': 'Все задачи',
            };
        }

        init() {
            this.changed();
            this.tabsEl.addEventListener('tabChange', this.changed.bind(this));
            this.newTask();
        }


        async changed() {
            const todoActiveTab = this.tabs.activeTab;
            const todoPanel = this.tabs.activePanel;

            todoPanel.innerHTML = '';
            new Loader(todoPanel).create()
            this.tabsEl.classList.add('_loader');
            this.tabsEl.classList.add('_stub');

            const data = await this.actionTasks.fetchPosts();
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
            if (nameTab === 'month') newData.data = sortByMonth(data);
            if (nameTab === 'year') newData.data = sortByYear(data);
            if (nameTab === 'other') newData.data = sortByOther(data);
            if (nameTab === 'all') newData.data = allTasks(data);


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
                    <button type="button" class="btn btn-reset ml-auto mr-auto mt-6 btn-primary" data-modal-path="create-task">
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
                    <article class="bg-white rounded-2xl flex justify-between gap-16 text-black py-6 px-8">
                        <div class="flex flex-col gap-4">
                            <p>${item.name || 'Без названия'}</p>
                            ${!item.other ? `<time class="text-md">${getFormatDate(item.date)}</time>` : ''}
                        </div>
                        ${!item.other ? `<time class="text-xs text-gray-400">${item.date}</time>` : ''}
                    </article>
                `;
                })
                todoPanel.insertAdjacentHTML('beforeend', `
                    ${`<h2 class="mb-5 text-2xl">${currentData.title}</h2>`}
                    <div class="flex flex-col gap-4">${html.join('')}</div>
                `);
            }

        }



        newTask() {
            const form = this.createTaskEl;
            const checkboxes = form.querySelectorAll('[data-checkbox-date]');
            const date = form.querySelector('[data-field-date]');
            const name = form.querySelector('[data-field-name]');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', checkboxHandler);
            })


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
                        date.datePicker.selectDate(`01.01.${new Date().getFullYear() + 1}`);
                    }
                } else {
                    date.removeAttribute('disabled');
                }
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    name: name.value,
                    date: date.value
                }
                this.createTask(data);
            })
        }

        async createTask(data) {
            new Loader(this.createTaskEl).createWithWrapper()
            await this.actionTasks.createTask(data);
            setTimeout(() => {
                new Loader(this.createTaskEl).hide()
                modalContainer.modal.close('create-task');
                this.changed();
            }, 250);
        }

        getContainerFromInput(el) {
            return el.closest('.input-primary');
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
    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/tasks.json`, {
                method: 'get'
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
            result.push(data[item]);
        }
    }
    return result;
}

function sortByOther(data) {
    const result = [];
    for (const item in data) {
        if (data[item].date === '') {
            data[item].other = true;
            result.push(data[item]);
        }
    }
    return result;
}

function sortByWeek(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentWeek(new Date(convertDateFromDDMM(data[item].date)))) {
            result.push(data[item]);
        }
    }
    return result;
}

function sortByMonth(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentMonth(new Date(convertDateFromDDMM(data[item].date)))) {
            result.push(data[item]);
        }
    }
    return result;
}

function sortByYear(data) {
    const result = [];
    for (const item in data) {
        if (isDateInCurrentYear(new Date(convertDateFromDDMM(data[item].date)))) {
            result.push(data[item]);
        }
    }
    return result;
}



function allTasks(data) {
    const result = [];
    for (const item in data) {
        result.push(data[item]);
    }
    return result;
}