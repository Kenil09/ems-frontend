import dayjs from 'dayjs';

const FormatDate = (value) => {
    return dayjs(value).format('DD-MMM-YYYY HH:mm A');
};

export default FormatDate;
