import dayjs from 'dayjs';

const firstDay = dayjs('2022-12-01');
const lastDay = dayjs('2022-12-25');

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TOTAL_DAYS = 25;
export const DEC1 = 1;
export const DEC25 = 25;

export const setLatestDay = day => {
	const latestDay = JSON.parse(localStorage.getItem('latestDay')) || [];
	latestDay.push(Number(day));
	latestDay.sort();
	localStorage.setItem('latestDay', JSON.stringify(latestDay));
}

export const getOpenedDays = () => JSON.parse(localStorage.getItem('latestDay')) || [];

const getFirstUnopenedDay = () => {
	const openedDays = getOpenedDays();
	let i = 0;
	while (i <= DEC25) {
		if (openedDays[i] !== (i + 1)) {
			return i + 1;
		}
		i++;
	}
	return DEC25;
}

const getDateKey = day => {
	// const latestDay = localStorage.getItem('latestDay');
	// const currentDate = day || (latestDay ? dayjs(`2020-12-${latestDay}`) : dayjs());
	const isDayBefore = day.isBefore(firstDay, 'day');
	const isDayAfter = day.isAfter(lastDay, 'day');
	const date = isDayBefore ? firstDay : (isDayAfter ? lastDay : day);
	return date.format(DATE_FORMAT);
}

export const getTodayOrLatest = day => {
	const now = dayjs();
	const isDecember = now.month() === 11; //in dayjs january starts is month 0
	const date = isDecember ? now.date() : DEC1;
	const openedDays = getOpenedDays();
	const isCurrentDayOpened = openedDays.indexOf(date) >= 0;
	const unopenedDay = isCurrentDayOpened ? getFirstUnopenedDay() : date;
	return unopenedDay >= DEC1 && unopenedDay <= DEC25 ? unopenedDay : DEC1;
}

const getAdvent = (day, isDevelopmentMode) => {
	const today = dayjs();
	const dateKey = getDateKey(day);
	const requiredDate = dayjs(dateKey);
	return import('./adventData')
		.then(data => {
			const adventData = data.default[dateKey];
			const openedDays = getOpenedDays();
			const isOpened = openedDays.indexOf(Number(adventData.day)) >= 0;
			adventData.gift.isOpened = isOpened;
			adventData.gift.canOpen = isDevelopmentMode || (!(today.isBefore(firstDay, 'day') || today.isAfter(lastDay, 'day')) && (requiredDate.isBefore(today, 'day') || requiredDate.isSame(today, 'day')));
			return adventData;
		});
};

export default getAdvent;
