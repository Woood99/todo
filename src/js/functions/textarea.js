export const textareaPrimary = (el) => {
    if (!el) return;
    const field = el.querySelector('.textarea-primary__textarea');
    const fieldMinHeight = el.dataset.textareaMinHeight;

    el.style.height = `${fieldMinHeight}px`;
    field.addEventListener('input', changeHeight);

    function changeHeight() {
        el.style.height = `${fieldMinHeight}px`;
        el.style.height = `${field.scrollHeight + 2}px`;
    }
}