import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { updateSearchQuerry } from '../redux/actions/bookListActionCreators';
import { getSearchQuerry } from '../redux/selectors';
import useTypedDispatch from '../hooks/useTypedDispatch';

interface SearchInputProps {
	className?: string,
	placeholder?: string,
}

const SearchInput = ({ className, placeholder }: SearchInputProps) => {
	const dispatch = useTypedDispatch();
	const currentSearchQuerry = useSelector(getSearchQuerry);
	const [localSearchQuerry, setLocalSearchQuerry] = useState(currentSearchQuerry);
	const ref = useRef<Function>(() => {});

	const sendFunc = useCallback(() => {
		dispatch(updateSearchQuerry(localSearchQuerry));
	}, [localSearchQuerry]);

	useEffect(() => {
		ref.current = sendFunc;
	}, [sendFunc]);

	const debouncedDispatchQuerry = useMemo(
		() => debounce(() => ref.current(), 300),
		[],
	);

	const onSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSearchQuerry(e.target.value);
		debouncedDispatchQuerry();
	}, [debouncedDispatchQuerry]);

	const inputClass = `search-input${className ? ` ${className}` : ''}`;

	return (
		<input
			className={inputClass}
			type="search"
			placeholder={placeholder}
			onChange={onSearchInputChange}
			value={localSearchQuerry}
		/>
	);
};

export default memo(SearchInput);
