import dayjs from 'dayjs';

export default FormatDate = (value) => {
    return dayjs(value).format('DD-MMM-YYYY HH:mm A');
};
