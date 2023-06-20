import { debounce } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchQuerry } from '../redux/actions/bookListActionCreators';

// не используется
const SearchInput = () => {
	const dispatch = useDispatch();
	const debouncedDispatchQuerry = useMemo(
		() => debounce((value: string) => { dispatch(updateSearchQuerry(value)); }, 300), [dispatch],
	);

	const onChangeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedDispatchQuerry(e.target.value);
	}, [debouncedDispatchQuerry]);

	return (
		<input
			className="search-header__search-input"
			type="search"
			placeholder="Найти книгу..."
			onChange={onChangeSearchInput}
		/>
	);
};

export default SearchInput;
