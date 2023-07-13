import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useTypedDispatch from '../hooks/useTypedDispatch';
import { ViewType } from '../types/BooksTypes';
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
import SearchHeader from '../components/SearchHeader';
import {
	SortEntries,
	mapSortEntryToSortType,
	mapSortTypeToSortEntry,
	getAuthorsOptions,
	getPublishersOptions,
	getSortOptions,
} from '../utils/searchHeaderContainerHelpers';

const SearchHeaderContainer = () => {
	const dispatch = useTypedDispatch();

	const currentView = useSelector(getView);
	const currentSort = useSelector(getSort);
	const currentPublisherFilterValue = useSelector(getPublisherFilterValue);
	const currentAuthorsFilterValue = useSelector(getAuthorsFilterValue);

	const publishersOptions = useMemo(() => getPublishersOptions(), []);
	const authorsOptions = useMemo(() => getAuthorsOptions(), []);
	const sortOptions = useMemo(() => getSortOptions(), []);

	const handleChangeSelectValue = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
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

	const handleChangeView = useCallback(
		(e: React.SyntheticEvent<HTMLButtonElement>) => {
			dispatch(changeView(e.currentTarget.value as ViewType));
		}, [],
	);

	return (
		<SearchHeader
			currentSort={mapSortTypeToSortEntry(currentSort)}
			currentPublisherFilterValue={currentPublisherFilterValue}
			currentAuthorsFilterValue={currentAuthorsFilterValue}
			onChangeValueInSelect={handleChangeSelectValue}
			publishersOption={publishersOptions}
			authorsOption={authorsOptions}
			sortOption={sortOptions}
			onChangeView={handleChangeView}
			currentView={`${currentView}_active`}
		/>
	);
};

export default SearchHeaderContainer;
