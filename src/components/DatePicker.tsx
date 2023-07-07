import { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDateFilterValues, getUTCOffset } from '../redux/selectors';
import { changeDateFilterValue, setUTCOffset } from '../redux/actions/bookListActionCreators';
import { inputDatetimeLocalFormat, serverDateTimeFormat } from '../constants';
import useOutsideClick from '../hooks/useOutsideClick';

const DatePicker = () => {
	const dispatch = useDispatch();
	const { rangeStart, rangeEnd } = useSelector(getDateFilterValues);
	const currentUtcOffset = useSelector(getUTCOffset);

	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [currentStartDate, setCurrentStartDate] = useState(
		rangeStart
			? moment.utc(rangeStart, serverDateTimeFormat).utcOffset(currentUtcOffset).format(inputDatetimeLocalFormat)
			: rangeStart,
	);
	const [currentEndDate, setCurrentEndDate] = useState(
		rangeEnd
			? moment.utc(rangeEnd, serverDateTimeFormat).utcOffset(currentUtcOffset).format(inputDatetimeLocalFormat)
			: rangeEnd,
	);

	const ref = useRef<HTMLDivElement>(null);

	const outsideClickHandler = useCallback(() => setIsPickerOpen(false), []);

	useOutsideClick(ref, outsideClickHandler);

	const pickerVisabilityHandler = (e: React.SyntheticEvent) => {
		e.stopPropagation();
		setIsPickerOpen((prevValue) => !prevValue);
	};

	const pickerFormHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		const startDate = currentStartDate
			? moment.utc(currentStartDate).utcOffset(-currentUtcOffset).format(serverDateTimeFormat)
			: undefined;

		const endDate = currentEndDate
			? moment.utc(currentEndDate).utcOffset(-currentUtcOffset).format(serverDateTimeFormat)
			: undefined;

		dispatch(changeDateFilterValue({ rangeStart: startDate, rangeEnd: endDate }));
	};

	const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'start-date') {
			setCurrentStartDate(e.target.value);
		} else {
			setCurrentEndDate(e.target.value);
		}
	};

	const handleUtcOffsetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setUTCOffset(Number(e.target.value)));
	};

	const clearButtonHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(changeDateFilterValue({}));
		setCurrentStartDate(undefined);
		setCurrentEndDate(undefined);
	};

	const isFilterActive = Boolean(rangeStart || rangeEnd);

	return (
		<div className="date-picker">
			<button
				className="date-picker__open-button"
				type="button"
				onClick={pickerVisabilityHandler}
			>
				<span>&#128197;</span>
			</button>
			<button
				className={
					`date-picker__mini-clear-button${!isFilterActive ? ' date-picker__mini-clear-button_hide' : ''}`
				}
				type="button"
				onClick={clearButtonHandler}
			>
				<span>&#x2715;</span>
			</button>
			<div ref={ref} className={`date-picker__content${isPickerOpen ? ' date-picker__content_visible' : ''}`}>
				<form className="date-picker__form" onSubmit={pickerFormHandler}>
					<label className="date-picker__label">
						<span>Смещение по UTC: {currentUtcOffset}</span>
						<input
							type="range"
							min={-11}
							max={12}
							value={currentUtcOffset}
							onChange={handleUtcOffsetInputChange}
						/>
					</label>
					<label className="date-picker__label">
						Начало:
						<input
							className="date-picker__input"
							type="datetime-local"
							name="start-date"
							value={currentStartDate || ''}
							onChange={handleDateInputChange}
						/>
					</label>
					<label className="date-picker__label">
						Конец:
						<input
							className="date-picker__input"
							type="datetime-local"
							name="end-date"
							value={currentEndDate || ''}
							onChange={handleDateInputChange}
						/>
					</label>
					<div className="date-picker__buttons-container">
						<button
							className="date-picker__submit-button"
							disabled={!currentStartDate && !currentEndDate}
							type="submit"
						>Применить
						</button>
						<button
							className="date-picker__clear-button"
							disabled={!isFilterActive}
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
