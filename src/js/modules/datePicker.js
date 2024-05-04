import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const datePicker = (el,input) => {
    if (!(el && input)) return;
    const wrapper = new AirDatepicker(input, {
        autoClose: true,
        isMobile: true,
        onSelect: (fd) => {
            fd.date ? el.classList.add('_active') : el.classList.remove('_active');
        },
    })
    input.datePicker = wrapper;
};

export default datePicker;