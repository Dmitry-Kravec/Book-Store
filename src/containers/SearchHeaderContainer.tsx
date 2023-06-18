import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortField, SortMethod, SortType, ViewType } from '../types/BooksTypes';
import {
	changeAuthorsFilterValue,
	changePublisherFilterValue,
	changeSortType,
	changeView,
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
import '../styles/search-header.scss';

enum SortEntries {
  none = 'None',
  authors_az = 'Authors (A - Z)',
  authors_za = 'Authors (Z - A)',
  publisher_az = 'Publisher (A - Z)',
  publisher_za = 'Publisher (Z - A)',
  price_asc = 'Price (ascending)',
  price_dsc = 'Price (descending)', // desc
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
	// for (const [sortEntry, { field, direction }] of Object.entries(mapObject)) {
	// 	if (field === currentField && direction === currentDirection) return sortEntry as SortEntries;
	// }

	const record = Object.entries(mapObject)
		.find(([, { field, direction }]) => (field === currentField && direction === currentDirection));

	// const entries = Object.entries(mapObject);
	// for (let i = 0; i < entries.length; i += 1) {
	// 	const [sortEntry, { field, direction }] = entries[i];
	// 	if (field === currentField && direction === currentDirection) return sortEntry as SortEntries;
	// }
	// return SortEntries.none;

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

	const publishersOption = useMemo(() => // Добавить All
		publishers.map((el) => (
			<option key={el} value={el}>
				{el}
			</option>
		)),
	[publishers]);

	const authorsOption = useMemo(() => authors.map((el) => (
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
