import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { SortField, SortMethod, SortType, ViewType } from '../types/BooksTypes';
import {
	changeAuthorsFilterValue,
	changePublisherFilterValue,
	changeSortType,
	changeView,
	updateSearchQuerry,
} from '../redux/actions/bookListActionCreators';
import {
	getAllAuthors,
	getAllPublishers,
	getAuthorsFilterValue,
	getPublisherFilterValue,
	getSort,
	getView,
} from '../redux/selectors';

import SearchHeader from '../components/SearchHeader';

enum SortEntries {
  none = 'None',
  authors_az = 'Authors (A - Z)',
  authors_za = 'Authors (Z - A)',
  publisher_az = 'Publisher (A - Z)',
  publisher_za = 'Publisher (Z - A)',
  price_asc = 'Price (asc)',
  price_dsc = 'Price (desc)',
}

const mapObject: Record<SortEntries, SortType> = {
	[SortEntries.authors_az]: { field: SortField.authors, direction: SortMethod.dsc },
	[SortEntries.authors_za]: { field: SortField.authors, direction: SortMethod.asc },
	[SortEntries.publisher_az]: { field: SortField.publisher, direction: SortMethod.dsc },
	[SortEntries.publisher_za]: { field: SortField.publisher, direction: SortMethod.asc },
	[SortEntries.price_asc]: { field: SortField.price, direction: SortMethod.asc },
	[SortEntries.price_dsc]: { field: SortField.price, direction: SortMethod.dsc },
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

const SearchHeaderContainer = () => {
	const dispatch = useDispatch();

	const currentView = useSelector(getView);
	const currentSort = useSelector(getSort);
	const currentPublisherFilterValue = useSelector(getPublisherFilterValue);
	const currentAuthorsFilterValue = useSelector(getAuthorsFilterValue);
	const publishers = useSelector(getAllPublishers);
	const authors = useSelector(getAllAuthors);

	const publishersOption = useMemo(() =>
		['All', ...publishers].map((el) => (
			<option key={el} value={el}>
				{el}
			</option>
		)),
	[publishers]);

	const authorsOption = useMemo(() =>
		['All', ...authors].map((el) => (
			<option key={el} value={el}>
				{el}
			</option>
		)), [authors]);

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
	}, [dispatch]);

	const onChangeView = useCallback(
		(e: React.SyntheticEvent<HTMLButtonElement>) => {
			dispatch(changeView(e.currentTarget.value as ViewType));
		}, [dispatch],
	);

	const debouncedDispatchQuerry = useMemo(
		() => debounce((value: string) => { dispatch(updateSearchQuerry(value)); }, 300),
		[],
	);

	const onChangeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedDispatchQuerry(e.target.value);
	}, [debouncedDispatchQuerry]);

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
			onChangeSearchInput={onChangeSearchInput}
		/>
	);
};

export default SearchHeaderContainer;
