import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useTypedDispatch from '../hooks/useTypedDispatch';
import { SortField, SortMethod, SortType, ViewType } from '../types/BooksTypes';
import {
	changeAuthorsFilterValue,
	changePublisherFilterValue,
	changeSortType,
	changeView,
} from '../redux/actions/bookListActionCreators';
import {
	getAuthorsFilterValue,
	getPublisherFilterValue,
	getSort,
	getView,
} from '../redux/selectors';

import { authors, publishers } from '../utils/customFields';

import SearchHeader from '../components/SearchHeader';

enum SortEntries {
  none = 'None',
  authors_az = 'Authors (A - Z)',
  authors_za = 'Authors (Z - A)',
  publisher_az = 'Publisher (A - Z)',
  publisher_za = 'Publisher (Z - A)',
  price_asc = 'Price (asc)',
  price_dsc = 'Price (desc)',
  date_asc = 'Date (asc)',
  date_dsc = 'Date (desc)',
}

const mapObject: Record<SortEntries, SortType> = {
	[SortEntries.authors_az]: { field: SortField.authors, direction: SortMethod.dsc },
	[SortEntries.authors_za]: { field: SortField.authors, direction: SortMethod.asc },
	[SortEntries.publisher_az]: { field: SortField.publisher, direction: SortMethod.dsc },
	[SortEntries.publisher_za]: { field: SortField.publisher, direction: SortMethod.asc },
	[SortEntries.price_asc]: { field: SortField.price, direction: SortMethod.asc },
	[SortEntries.price_dsc]: { field: SortField.price, direction: SortMethod.dsc },
	[SortEntries.date_asc]: { field: SortField.date, direction: SortMethod.asc },
	[SortEntries.date_dsc]: { field: SortField.date, direction: SortMethod.dsc },
	[SortEntries.none]: {},
};

function mapSortEntryToSortType(entry: SortEntries): SortType {
	return mapObject[entry];
}

function mapSortTypeToSortEntry({
	field: currentField,
	direction: currentDirection,
}: SortType): SortEntries {
	const record = Object.entries(mapObject)
		.find(([, { field, direction }]) => (field === currentField && direction === currentDirection));

	return record ? record[0] as SortEntries : SortEntries.none;
}

const sortOption = Object.values(SortEntries).map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));

const publishersOption = ['All', ...publishers].map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));

const authorsOption = ['All', ...authors].map((el) => (
	<option key={el} value={el}>
		{el}
	</option>
));

const SearchHeaderContainer = () => {
	const dispatch = useTypedDispatch();

	const currentView = useSelector(getView);
	const currentSort = useSelector(getSort);
	const currentPublisherFilterValue = useSelector(getPublisherFilterValue);
	const currentAuthorsFilterValue = useSelector(getAuthorsFilterValue);

	const onChangeValueInSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		switch (e.target.name) {
			case 'publisher':
				dispatch(changePublisherFilterValue(e.target.value));
				break;
			case 'authors':
				dispatch(changeAuthorsFilterValue(e.target.value));
				break;
			case 'sort':
				dispatch(changeSortType(mapSortEntryToSortType(e.target.value as SortEntries)));
				break;
			default:
		}
	}, []);

	const onChangeView = useCallback(
		(e: React.SyntheticEvent<HTMLButtonElement>) => {
			dispatch(changeView(e.currentTarget.value as ViewType));
		}, [],
	);

	return (
		<SearchHeader
			currentSort={mapSortTypeToSortEntry(currentSort)}
			currentPublisherFilterValue={currentPublisherFilterValue}
			currentAuthorsFilterValue={currentAuthorsFilterValue}
			onChangeValueInSelect={onChangeValueInSelect}
			publishersOption={publishersOption}
			authorsOption={authorsOption}
			sortOption={sortOption}
			onChangeView={onChangeView}
			currentView={`${currentView}_active`}
		/>
	);
};

export default SearchHeaderContainer;
