export function getCurrentDateString(date) {
    const today = !date ? new Date() : new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}.${mm}.${yyyy}`
}

export function getFormatDateMM(date) {
    const today = !date ? new Date() : new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${mm}.${dd}.${yyyy}`
}

export function getTomorrowDay(date) {
    const startDate = !date ? new Date() : new Date(date);
    const day = 60 * 60 * 24 * 1000;
    return new Date(startDate.getTime() + day);
}

export function getFormatDate(currentDate) {
    if (currentDate.length < 12) {
        currentDate = new Date(convertDateFromDDMM(currentDate));
    }

    const newDate = new Date(currentDate);
    const maps = {
        daysOfWeek: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
        ],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        months2: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    };
    const date = new Date(newDate.setDate(newDate.getDate()));
    return `
        ${maps.daysOfWeek[date.getDay()]}
        ${date.getDate()}
        ${maps.months2[maps.months.indexOf(maps.months[date.getMonth()])].toLowerCase()}
    `;
}


export function convertDateFromDDMM(date) {
    if (!date) return;
    const arr = date.split('.');
    return [arr[1], arr[0], arr[2]].join('.');
}



export function isDateInCurrentWeek(date) {
    const startOfWeek = new Date(getStartOfWeek().toDateString());
    const endOfWeek = new Date(getEndtOfWeek().toDateString());
    return date >= startOfWeek && date <= endOfWeek;
}

export function isDateInCurrentMonth(date) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    return currentMonth === dateMonth && currentYear === dateYear;
}
export function isDateInCurrentYear(date) {
    const currentYear = new Date().getFullYear();

    const dateYear = date.getFullYear();

    return currentYear === dateYear;
}


export function getStartOfWeek() {
    const now = new Date();
    return new Date(now.setDate(now.getDate() - now.getDay() + 1));
}
export function getEndtOfWeek() {
    const now = new Date();
    return new Date(now.setDate(now.getDate() - now.getDay() + 7));
}