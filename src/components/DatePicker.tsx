import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDateFilterValues } from '../redux/selectors';
import { changeDateFilterValue } from '../redux/actions/bookListActionCreators';
import { serverDateTimeFormat } from '../constants';

// console.log(moment().format());
// console.log(moment().utcOffset(3).format());
// console.log(moment().add(3, 'hour').format());
// console.log(moment.utc().format());
// console.log(moment().utcOffset(3).format());
// console.log(moment().isSame(moment().utc().add(3, 'hour')));
// console.log(moment().isSame(moment().add(3, 'hour')));
// console.log(moment().isSame(moment().utcOffset(3)));
// console.log(moment().hours(1));
// console.log(moment().set('hour', 1));
// console.log(moment('30-06-2023 20:50:44', serverDateTimeFormat));
// console.log(moment('30-06-2023 20:50:44', serverDateTimeFormat).hour());
// console.log(moment('30-06-2023 20:50:44', serverDateTimeFormat).utc());
// console.log(moment('30-06-2023 20:50:44', serverDateTimeFormat).utc().hour());
console.log(moment.utc(null));

console.log(moment('30-06-2023 05:00:00', serverDateTimeFormat).utc());
console.log(moment.utc('30-06-2023 05:00:00', serverDateTimeFormat));
console.log(moment('30-06-2023 05:00:00', serverDateTimeFormat).utc().format());
console.log(moment.utc('30-06-2023 05:00:00', serverDateTimeFormat).format());

// console.log(moment.parseZone());
// console.log(moment.utc());
// console.log(moment.utc().utcOffset(-moment().utcOffset()));
// console.log(moment.utc(Date.now()));

const DatePicker = () => {
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const dispatch = useDispatch();
	const [rangeStart, rangeEnd] = useSelector(getDateFilterValues);

	const [currentStartDate, setCurrentStartDate] = useState(rangeStart);
	const [currentEndDate, setCurrentEndDate] = useState(rangeEnd);

	const pickerVisabilityHandler = () => {
		setIsPickerOpen((prevValue) => !prevValue);
	};

	const pickerFormHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(currentStartDate);
		// console.log(currentStartDate.format(serverDateTimeFormat));
		console.log(currentEndDate);
		// console.log(currentEndDate.format(serverDateTimeFormat));

		dispatch(changeDateFilterValue([
			currentStartDate,
			currentEndDate,
		]));
	};

	const hadnleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'start-date') {
			setCurrentStartDate(moment(e.target.value).utc().format(serverDateTimeFormat));
		} else {
			setCurrentEndDate(moment(e.target.value).utc().format(serverDateTimeFormat));
		}
	};

	const clearButtonHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(changeDateFilterValue([]));
	};

	return (
		<div className="date-picker">
			<button
				className="date-picker__open-button"
				type="button"
				onClick={pickerVisabilityHandler}
			>
				&#128197;
			</button>

			<div className={`date-picker__content${isPickerOpen ? ' date-picker__content_visible' : ''}`}>
				<form className="date-picker__form" onSubmit={pickerFormHandler}>
					<label className="date-picker__label">
						Начало:
						<input
							className="date-picker__input"
							type="datetime-local"
							name="start-date"
							value={
								(currentStartDate
									? moment.utc(currentStartDate, serverDateTimeFormat).local()
									: moment()
								).format('yyyy-MM-DD HH:mm')
							}
							onChange={hadnleInputChange}
						/>
					</label>
					<label className="date-picker__label">
						Конец:
						<input
							className="date-picker__input"
							type="datetime-local"
							name="end-date"
							value={
								(currentEndDate
									? moment.utc(currentEndDate, serverDateTimeFormat).local()
									: moment()
								).format('yyyy-MM-DD HH:mm')
							}
							onChange={hadnleInputChange}
						/>
					</label>
					<div className="date-picker__buttons-container">
						<button
							className="date-picker__submit-button"
							type="submit"
						>Применить
						</button>
						<button
							className={
								`date-picker__clear-button${!rangeStart && !rangeEnd ? ' date-picker__clear-button_hide' : ''}`
							}
							onClick={clearButtonHandler}
							type="button"
						>
							Сбросить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DatePicker;
