import dayjs from 'dayjs';

const firstDay = dayjs('2020-12-01');
const lastDay = dayjs('2020-12-25');

const KEY = 'adventData';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TOTAL_DAYS = 25;

const getDateKey = day => {
	const currentDate = day || dayjs();
	const isDayBefore = currentDate.isBefore(firstDay, 'day');
	const isDayAfter = currentDate.isAfter(lastDay, 'day');
	const date = isDayBefore ? firstDay : (isDayAfter ? lastDay : currentDate);
	return date.format(DATE_FORMAT);
}

const getAdvent = day => {
	const dateKey = getDateKey(day);
	return import('./adventData')
		.then(data => {
			return data.default[dateKey];
		});
};

export default getAdvent;
