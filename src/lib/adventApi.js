import dayjs from 'dayjs';

const firstDay = dayjs('2020-12-01');
const lastDay = dayjs('2020-12-25');

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TOTAL_DAYS = 25;
export const DEC1 = 1;
export const DEC25 = 25;

export const setLatestDay = day => {
	const latestDay = JSON.parse(localStorage.getItem('latestDay')) || [];
	latestDay.push(day);
	localStorage.setItem('latestDay', JSON.stringify(latestDay));
}

const getLatestDay = () => JSON.parse(localStorage.getItem('latestDay')) || [];

const getDateKey = day => {
	const latestDay = localStorage.getItem('latestDay');
	const currentDate = day || (latestDay ? dayjs(`2020-12-${latestDay}`) : dayjs());
	const isDayBefore = currentDate.isBefore(firstDay, 'day');
	const isDayAfter = currentDate.isAfter(lastDay, 'day');
	const date = isDayBefore ? firstDay : (isDayAfter ? lastDay : currentDate);
	return date.format(DATE_FORMAT);
}

const getAdvent = day => {
	const today = dayjs();
	const dateKey = getDateKey(day);
	const requiredDate = dayjs(dateKey);
	return import('./adventData')
		.then(data => {
			const adventData = data.default[dateKey];
			const latestDay = getLatestDay();
			const isOpened = latestDay.indexOf(adventData.day) >= 0;
			adventData.gift.isOpened = isOpened;
			adventData.gift.canOpen = (!(today.isBefore(firstDay, 'day') || today.isAfter(lastDay, 'day')) && (requiredDate.isBefore(today, 'day') || requiredDate.isSame(today, 'day')));
			// adventData.gift.canOpen = true;
			return adventData;
		});
};

export default getAdvent;
