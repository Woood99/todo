/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/date.js":
/*!********************************!*\
  !*** ./src/js/modules/date.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convertDateFromDDMM: () => (/* binding */ convertDateFromDDMM),\n/* harmony export */   getCurrentDateString: () => (/* binding */ getCurrentDateString),\n/* harmony export */   getCurrentYear: () => (/* binding */ getCurrentYear),\n/* harmony export */   getEndtOfWeek: () => (/* binding */ getEndtOfWeek),\n/* harmony export */   getFormatDate: () => (/* binding */ getFormatDate),\n/* harmony export */   getFormatDateMM: () => (/* binding */ getFormatDateMM),\n/* harmony export */   getStartOfWeek: () => (/* binding */ getStartOfWeek),\n/* harmony export */   getTomorrowDay: () => (/* binding */ getTomorrowDay),\n/* harmony export */   isDateInCurrentMonth: () => (/* binding */ isDateInCurrentMonth),\n/* harmony export */   isDateInCurrentWeek: () => (/* binding */ isDateInCurrentWeek),\n/* harmony export */   isDateInCurrentYear: () => (/* binding */ isDateInCurrentYear)\n/* harmony export */ });\nfunction getCurrentDateString(date) {\r\n    const today = !date ? new Date() : new Date(date);\r\n    const dd = String(today.getDate()).padStart(2, '0');\r\n    const mm = String(today.getMonth() + 1).padStart(2, '0');\r\n    const yyyy = today.getFullYear();\r\n    return `${dd}.${mm}.${yyyy}`\r\n}\r\n\r\nfunction getFormatDateMM(date) {\r\n    const today = !date ? new Date() : new Date(date);\r\n    const dd = String(today.getDate()).padStart(2, '0');\r\n    const mm = String(today.getMonth() + 1).padStart(2, '0');\r\n    const yyyy = today.getFullYear();\r\n    return `${mm}.${dd}.${yyyy}`\r\n}\r\n\r\nfunction getTomorrowDay(date) {\r\n    const startDate = !date ? new Date() : new Date(date);\r\n    const day = 60 * 60 * 24 * 1000;\r\n    return new Date(startDate.getTime() + day);\r\n}\r\n\r\nfunction getFormatDate(currentDate, format = 'default') {\r\n    if (currentDate.length < 12) {\r\n        currentDate = new Date(convertDateFromDDMM(currentDate));\r\n    }\r\n\r\n    const newDate = new Date(currentDate);\r\n    const maps = {\r\n        daysOfWeek: [\r\n            'Воскресенье',\r\n            'Понедельник',\r\n            'Вторник',\r\n            'Среда',\r\n            'Четверг',\r\n            'Пятница',\r\n            'Суббота',\r\n        ],\r\n        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],\r\n        months2: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],\r\n    };\r\n    const date = new Date(newDate.setDate(newDate.getDate()));\r\n    const year = getCurrentYear();\r\n    if (format === 'default') {\r\n        return `\r\n        ${maps.daysOfWeek[date.getDay()]}\r\n        ${date.getDate()}\r\n        ${maps.months2[maps.months.indexOf(maps.months[date.getMonth()])].toLowerCase()}\r\n    `;\r\n    }\r\n    if (format === 'mm,yyyy') {\r\n        return `\r\n        ${maps.months[date.getMonth()].toLowerCase()}\r\n        ${year}\r\n    `;\r\n    }\r\n}\r\n\r\n\r\nfunction convertDateFromDDMM(date) {\r\n    if (!date) return;\r\n    const arr = date.split('.');\r\n    return [arr[1], arr[0], arr[2]].join('.');\r\n}\r\n\r\n\r\n\r\nfunction isDateInCurrentWeek(date) {\r\n    const startOfWeek = new Date(getStartOfWeek().toDateString());\r\n    const endOfWeek = new Date(getEndtOfWeek().toDateString());\r\n    return date >= startOfWeek && date <= endOfWeek;\r\n}\r\n\r\nfunction isDateInCurrentMonth(date) {\r\n    const currentMonth = new Date().getMonth();\r\n    const currentYear = new Date().getFullYear();\r\n\r\n    const dateMonth = date.getMonth();\r\n    const dateYear = date.getFullYear();\r\n\r\n    return currentMonth === dateMonth && currentYear === dateYear;\r\n}\r\n\r\nfunction isDateInCurrentYear(date) {\r\n    const currentYear = new Date().getFullYear();\r\n\r\n    const dateYear = date.getFullYear();\r\n\r\n    return currentYear === dateYear;\r\n}\r\n\r\n\r\nfunction getStartOfWeek() {\r\n    const now = new Date();\r\n    return new Date(now.setDate(now.getDate() - now.getDay() + 1));\r\n}\r\nfunction getEndtOfWeek() {\r\n    const now = new Date();\r\n    return new Date(now.setDate(now.getDate() - now.getDay() + 7));\r\n}\r\n\r\nfunction getCurrentYear() {\r\n    return new Date().getFullYear();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://gulp-builder/./src/js/modules/date.js?");

/***/ }),

/***/ "./src/js/modules/dynamicModal.js":
/*!****************************************!*\
  !*** ./src/js/modules/dynamicModal.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ dynamicModal)\n/* harmony export */ });\nclass dynamicModal {\r\n    constructor(html, selector,options) {\r\n        this.html = html;\r\n        this.selector = selector;\r\n        this.isOpen = false;\r\n        this.body = document.body;\r\n        this.speed = 300;\r\n        this.animation = 'fade';\r\n        this.scrollValue = document.querySelector('.page__body').classList.contains('dis-scroll') ? true : false;\r\n        this._focusElements = [\r\n            'a[href]',\r\n            'input',\r\n            'select',\r\n            'textarea',\r\n            'button',\r\n            'iframe',\r\n            '[contenteditable]',\r\n            '[tabindex]:not([tabindex^=\"-\"])'\r\n        ];\r\n        this._fixBlocks = document.querySelectorAll('.fix-block');\r\n        this.previousActiveElement = null;\r\n        let defaultOptions = {\r\n            isOpen: () => {},\r\n            isClose: () => {},\r\n        }\r\n        this.options = Object.assign(defaultOptions, options);\r\n        if (document.querySelector(this.selector) || !this.html) return;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        document.body.insertAdjacentHTML('beforeend', this.html);\r\n        this.modal = document.querySelector(this.selector);\r\n        if (!this.modal) return;\r\n        this.modalContainer = this.modal.querySelector(`${this.selector}__container`);\r\n        if (!this.modalContainer) return;\r\n        setTimeout(() => {\r\n            this.open();\r\n        }, 1);\r\n        this.events();\r\n    }\r\n\r\n    events() {\r\n        this.modal.addEventListener('click', (e) => {\r\n            const target = e.target;\r\n            if (target.closest('.js-modal-close')) {\r\n                this.close();\r\n            }\r\n            if (target.classList.contains(this.selector.replace(/^\\./, \"\"))) {\r\n                this.close();\r\n            }\r\n        })\r\n        window.addEventListener('keydown', (e) => {\r\n            if (e.keyCode == 27) {\r\n                this.close();\r\n            }\r\n            if (e.which == 9 && this.isOpen) {\r\n                this.focusCatch(e);\r\n            }\r\n        })\r\n    }\r\n\r\n    open() {\r\n        if (!this.isOpen) {\r\n            this.options.isOpen(this);\r\n            if (!this.previousActiveElement) {\r\n                this.previousActiveElement = document.activeElement;\r\n            }\r\n            this.modalContainer.scrollTo(0, 0);\r\n            this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);\r\n            this.modal.classList.add('is-open');\r\n            if (!this.scrollValue) {\r\n                this.body.style.scrollBehavior = 'auto';\r\n                document.documentElement.style.scrollBehavior = 'auto';\r\n                this.disableScroll();\r\n            }\r\n            this.modalContainer.classList.add('modal-open');\r\n            this.modalContainer.classList.add(this.animation);\r\n            setTimeout(() => {\r\n                this.modalContainer.classList.add('animate-open');\r\n                this.isOpen = true;\r\n                this.focusTrap();\r\n            }, this.speed);\r\n        }\r\n    }\r\n\r\n    close() {\r\n        if (this.isOpen) {\r\n            this.modalContainer.classList.remove('animate-open');\r\n            this.modalContainer.classList.remove(this.animation);\r\n            this.modal.classList.remove('is-open');\r\n            this.modalContainer.classList.remove('modal-open');\r\n\r\n            if (!this.scrollValue) {\r\n                this.enableScroll();\r\n                this.body.style.scrollBehavior = 'auto';\r\n                document.documentElement.style.scrollBehavior = 'auto';\r\n            }\r\n\r\n            this.options.isClose(this);\r\n            setTimeout(() => {\r\n                this.modal.remove();\r\n            }, this.speed);\r\n            this.isOpen = false;\r\n            this.focusTrap();\r\n        }\r\n    }\r\n\r\n    disableScroll() {\r\n        let pagePosition = window.scrollY;\r\n        this.lockPadding();\r\n        this.body.classList.add('dis-scroll');\r\n        this.body.dataset.position = pagePosition;\r\n        this.body.style.top = -pagePosition + 'px';\r\n    }\r\n\r\n    enableScroll() {\r\n        let pagePosition = parseInt(this.body.dataset.position, 10);\r\n        this.unlockPadding();\r\n        this.body.style.top = 'auto';\r\n        this.body.classList.remove('dis-scroll');\r\n        window.scrollTo({\r\n            top: pagePosition,\r\n            left: 0\r\n        });\r\n        this.body.removeAttribute('data-position');\r\n    }\r\n\r\n    lockPadding() {\r\n        let paddingOffset = window.innerWidth - this.body.offsetWidth + 'px';\r\n        this._fixBlocks.forEach((el) => {\r\n            el.style.paddingRight = paddingOffset;\r\n        });\r\n        this.body.style.paddingRight = paddingOffset;\r\n    }\r\n\r\n    unlockPadding() {\r\n        this._fixBlocks.forEach((el) => {\r\n            el.style.paddingRight = '0px';\r\n        });\r\n        this.body.style.paddingRight = '0px';\r\n    }\r\n\r\n    focusCatch(e) {\r\n        const nodes = this.modal.querySelectorAll(this._focusElements);\r\n        const nodesArray = Array.prototype.slice.call(nodes);\r\n        const focusedItemIndex = nodesArray.indexOf(document.activeElement)\r\n        if (e.shiftKey && focusedItemIndex === 0) {\r\n            nodesArray[nodesArray.length - 1].focus();\r\n            e.preventDefault();\r\n        }\r\n        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {\r\n            nodesArray[0].focus();\r\n            e.preventDefault();\r\n        }\r\n    }\r\n\r\n    focusTrap() {\r\n        if (this.isOpen) {\r\n            const nodes = this.modal.querySelectorAll(this._focusElements);\r\n            if (nodes.length) nodes[0].focus();\r\n        } else {\r\n            this.previousActiveElement.focus();\r\n            this.previousActiveElement = null;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://gulp-builder/./src/js/modules/dynamicModal.js?");

/***/ }),

/***/ "./src/js/pages/home.js":
/*!******************************!*\
  !*** ./src/js/pages/home.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/date.js */ \"./src/js/modules/date.js\");\n/* harmony import */ var _modules_dynamicModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/dynamicModal.js */ \"./src/js/modules/dynamicModal.js\");\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const modalContainer = document.querySelector('.modal-container');\n    class Todo {\n        constructor() {\n            this.tabs = document.querySelector('[data-todo-tabs]').wdTab;\n            if (!this.tabs) return;\n            this.tabsEl = this.tabs.container;\n            this.createTaskEl = document.querySelector('.create-task');\n            this.actionTasks = new ActionTasks();\n            this.init();\n\n            this.textStub = {\n                'today': 'Задач на сегодня нет!',\n                'tomorrow': 'Задач на завтра нет!',\n                'week': 'Задач на эту неделю нет!',\n                'month': 'Задач на этот месяц нет!',\n                'year': 'Задач на этот год нет!',\n                'other': 'Задач нет!',\n                'all': 'Задач нет!',\n            };\n        }\n\n        init() {\n            this.changed();\n            this.tabsEl.addEventListener('tabChange', this.changed.bind(this));\n            this.newTask();\n            this.tabsEl.addEventListener('click', this.deleteTask.bind(this));\n            this.tabsEl.addEventListener('click', this.editTask.bind(this));\n        }\n\n\n        async changed(loaderCreate = true) {\n            const todoActiveTab = this.tabs.activeTab;\n            const todoPanel = this.tabs.activePanel;\n\n            if (loaderCreate) {\n                todoPanel.innerHTML = '';\n                new Loader(todoPanel).create()\n            }\n            this.tabsEl.classList.add('_loader');\n            this.tabsEl.classList.add('_stub');\n\n            const data = await this.actionTasks.fetchTasks();\n            new Loader(todoPanel).hide();\n\n            const nameTab = todoActiveTab.dataset.tabName;\n            let newData = {};\n            if (nameTab === 'today') {\n                newData.data = sortByToday(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи на сегодня \n                    <span class=\"text-sm text-gray-400\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)(new Date())}<span>\n                    `;\n                }\n            }\n            if (nameTab === 'tomorrow') {\n                newData.data = sortByTomorrow(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи на завтра \n                    <span class=\"text-sm text-gray-400\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getTomorrowDay)(new Date()))}<span>\n                    `;\n                }\n            }\n            if (nameTab === 'week') {\n                newData.data = sortByWeek(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи на неделю \n                    <span class=\"text-sm text-gray-400\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getStartOfWeek)())} — ${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getEndtOfWeek)())}<span>\n                    `;\n                }\n            }\n            if (nameTab === 'month') {\n                newData.data = sortByMonth(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи на месяц \n                    <span class=\"text-sm text-gray-400\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getFormatDate)(new Date(),'mm,yyyy')}<span>\n                    `;\n                }\n            }\n            if (nameTab === 'year') {\n                newData.data = sortByYear(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи на год \n                    <span class=\"text-sm text-gray-400\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentYear)()}<span>\n                    `;\n                }\n            }\n            if (nameTab === 'other') {\n                newData.data = sortByOther(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Задачи без конкретной даты`;\n                }\n            }\n            if (nameTab === 'all') {\n                newData.data = allTasks(data);\n                if (newData.data.length > 0) {\n                    newData.title = `Все задачи`;\n                }\n            }\n\n\n            this.tabsEl.classList.remove('_loader');\n            if (newData.data && newData.data.length > 0) {\n                renderPosts.call(this, newData);\n                this.tabsEl.classList.remove('_stub');\n            } else {\n                renderStub.call(this);\n            }\n\n\n            function renderStub() {\n                const nameTab = todoActiveTab.dataset.tabName;\n                if (!nameTab) return;\n                todoPanel.innerHTML = `\n                    <span class=\"text-center block mt-[40px] text-2xl\">${this.textStub[nameTab]}</span>\n                    <button type=\"button\" class=\"btn btn-reset ml-auto mr-auto mt-6 btn-primary\" data-modal-path=\"create-task\">\n                        <span class=\"btn-primary__text\">\n                            Добавить задачу\n                        </span>\n                    </button>\n                `;\n            }\n\n            function renderPosts(currentData) {\n                const data = currentData.data;\n                const html = data.map(item => {\n                    return `\n                    <article class=\"bg-white rounded-2xl flex flex-col text-black py-6 px-8\" data-card-id=\"${item.id}\">\n                        <div class=\"flex gap-4 items-center justify-between pb-4 mb-6 border-gray-200 border-b md1:flex-col md1:items-start md1:gap-3 md1:mb-4\">\n                            <p class=\"font-medium\">${item.name}</p>\n                            <div class=\"flex items-center gap-5\">\n                                ${item.date ? `<time class=\"text-md whitespace-nowrap\">${(0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getFormatDate)(item.date)}</time>` : '<span></span>'}\n                                ${item.date ? `<time class=\"text-xs text-gray-400 whitespace-nowrap\">${item.date}</time>` : ''}\n                            </div>\n                        </div>\n                        <div class=\"flex items-center justify-between md1:flex-col md1:items-start md1:gap-4\">\n                            <div class=\"flex-grow max-w-[80%] text-gray-500 whitespace-pre-wrap md1:max-w-full\">${item.descr}</div>\n                            <div class=\"flex items-center gap-4 self-end\">\n                                <button type=\"button\" data-tooltip-html=\"Редактировать задачу\" data-tooltip-desktop data-button-edit-task>\n                                    <svg class=\"w-6 h-6 pointer-events-none\" viewBox=\"0 0 192 192\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" fill=\"none\"><path d=\"m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67\" class=\"cls-1\" style=\"fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#5478e6;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1\" transform=\"translate(-77.923 40.646)\"/><path d=\"m195.656 33.271-52.882 52.882\" style=\"fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#5478e6;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;   stroke-dasharray:none;stroke-opacity:1\" transform=\"translate(-77.923 40.646)\"/></svg>                     \n                                </button>\n                                <button type=\"button\" data-tooltip-html=\"Удалить задачу\" data-tooltip-desktop data-button-delete-task>\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"red\" class=\"w-6 h-6 pointer-events-none\">\n                                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0\" />\n                                    </svg>                          \n                                </button>\n                            </div>\n                        </div>\n                    </article>\n                `;\n                })\n                todoPanel.insertAdjacentHTML('beforeend', `\n                    ${`<h2 class=\"mb-5 text-2xl\">${currentData.title}</h2>`}\n                    <div class=\"flex flex-col gap-4\">${html.join('')}</div>\n                `);\n            }\n\n        }\n\n        async deleteTask(e) {\n            const target = e.target;\n            const button = target.closest('[data-button-delete-task]');\n            if (!button) return;\n            this.deleteTooltips();\n            this.tabs.activePanel.innerHTML = '';\n            this.tabsEl.classList.add('_loader');\n            new Loader(this.tabs.activePanel).create();\n\n            const currentID = button.closest('[data-card-id]').dataset.cardId;\n            await this.actionTasks.deleteTask(currentID);\n            this.changed(false);\n        }\n\n        async editTask(e) {\n            const target = e.target;\n            const button = target.closest('[data-button-edit-task]');\n            if (!button) return;\n            this.deleteTooltips();\n\n            const modalContentHTML = `\n            <div class=\"modal edit-task _center\">\n                <div class=\"modal__container edit-task__container\">\n                    <button type=\"button\" class=\"btn btn-reset modal__close edit-task__close js-modal-close\">\n                        <svg>\n                            <use xlink:href=\"./img/sprite.svg#close\"></use>\n                        </svg>\n                    </button>\n                    <div class=\"modal__content edit-task__content\">\n                        123\n                    </div>\n                </div>\n            </div>\n            `;\n            const modal = new _modules_dynamicModal_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](modalContentHTML, '.edit-task', {\n                isOpen(modal) {\n                    console.log(modal);\n                }\n            });\n\n        }\n\n\n\n        newTask() {\n            const form = this.createTaskEl;\n            const checkboxes = form.querySelectorAll('[data-checkbox-date]');\n            const date = form.querySelector('[data-field-date]');\n            const name = form.querySelector('[data-field-name]');\n            const descr = form.querySelector('[data-field-descr]');\n\n            checkboxes.forEach(checkbox => {\n                checkbox.addEventListener('change', checkboxHandler);\n            })\n\n\n            function checkboxHandler() {\n                const name = this.dataset.checkboxDate;\n\n                checkboxes.forEach(checkbox => {\n                    if (this !== checkbox) checkbox.checked = false;\n                });\n                date.datePicker.clear();\n                if (this.checked) {\n                    date.setAttribute('disabled', '');\n\n                    if (name === 'today') {\n                        date.datePicker.selectDate(new Date());\n                    }\n                    if (name === 'tomorrow') {\n                        date.datePicker.selectDate((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getTomorrowDay)(new Date()));\n                    }\n                    if (name === 'year') {\n                        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);\n                        date.datePicker.selectDate(lastDayOfYear);\n                    }\n                } else {\n                    date.removeAttribute('disabled');\n                }\n            }\n\n            form.addEventListener('submit', (e) => {\n                e.preventDefault();\n                const data = {\n                    name: name.value || 'Без названия',\n                    descr: descr.value || '',\n                    date: date.value || null\n                }\n                this.createTask(data);\n            })\n        }\n\n        async createTask(data) {\n            new Loader(this.createTaskEl).createWithWrapper()\n            await this.actionTasks.createTask(data);\n            new Loader(this.createTaskEl).hide()\n            modalContainer.modal.close('create-task');\n            this.changed();\n        }\n\n        getContainerFromInput(el) {\n            return el.closest('.input-primary');\n        }\n\n        deleteTooltips() {\n            document.querySelectorAll('.tooltip-html').forEach(item => item.remove());\n        }\n\n    }\n\n    new Todo();\n});\n\n\nclass ActionTasks {\n    constructor() {\n        this.url = 'https://todo-61c91-default-rtdb.firebaseio.com/';\n    }\n\n    async createTask(post) {\n        try {\n            const request = new Request(`${this.url}/tasks.json`, {\n                method: 'post',\n                body: JSON.stringify(post)\n            });\n            return this.useRequest(request);\n        } catch (error) {\n            console.log(error);\n        }\n    }\n\n    async fetchTasks() {\n        try {\n            const request = new Request(`${this.url}/tasks.json`, {\n                method: 'get'\n            });\n            return this.useRequest(request);\n        } catch (error) {\n            console.log(error);\n        }\n    }\n\n    async deleteTask(id) {\n        try {\n            const request = new Request(`${this.url}/tasks/${id}.json`, {\n                method: 'DELETE'\n            });\n            return this.useRequest(request);\n        } catch (error) {\n            console.log(error);\n        }\n    }\n\n    async useRequest(request) {\n        const response = await fetch(request)\n        return await response.json();\n    }\n}\n\n\nclass Loader {\n    constructor(target, path) {\n        this.el = target;\n        this.path = path || 'beforeend';\n        if (!this.el) return;\n        this.loader = this.el.querySelector('.loader-wrapper') || this.el.querySelector('.loader') || null;\n    }\n\n    createWithWrapper() {\n        if (this.loader) return;\n        this.el.insertAdjacentHTML(this.path, `\n            <div class=\"loader-wrapper\">\n                <span class=\"loader\"></span>\n            </div>\n        `);\n    }\n    create() {\n        if (this.loader) return;\n        this.el.insertAdjacentHTML(this.path, `\n            <span class=\"loader\"></span>\n        `);\n    }\n\n    hide() {\n        if (!this.loader) return;\n        this.loader.remove();\n    }\n}\n\nfunction sortByToday(data) {\n    const currentDate = (0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)(new Date());\n    const result = [];\n    for (const item in data) {\n        if (data[item].date === currentDate) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\nfunction sortByTomorrow(data) {\n    const currentDate = (0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDateString)((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.getTomorrowDay)(new Date()));\n    const result = [];\n    for (const item in data) {\n        if (data[item].date === currentDate) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\nfunction sortByOther(data) {\n    const result = [];\n    for (const item in data) {\n        if (!data[item].date) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\nfunction sortByWeek(data) {\n    const result = [];\n    for (const item in data) {\n        if ((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.isDateInCurrentWeek)(new Date((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.convertDateFromDDMM)(data[item].date)))) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\nfunction sortByMonth(data) {\n    const result = [];\n    for (const item in data) {\n        if ((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.isDateInCurrentMonth)(new Date((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.convertDateFromDDMM)(data[item].date)))) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\nfunction sortByYear(data) {\n    const result = [];\n    for (const item in data) {\n        if ((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.isDateInCurrentYear)(new Date((0,_modules_date_js__WEBPACK_IMPORTED_MODULE_0__.convertDateFromDDMM)(data[item].date)))) {\n            data[item].id = item;\n            result.push(data[item]);\n        }\n    }\n    return result;\n}\n\n\n\nfunction allTasks(data) {\n    const result = [];\n    for (const item in data) {\n        data[item].id = item;\n        result.push(data[item]);\n    }\n    return result;\n}\n\n//# sourceURL=webpack://gulp-builder/./src/js/pages/home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/pages/home.js");
/******/ 	
/******/ })()
;