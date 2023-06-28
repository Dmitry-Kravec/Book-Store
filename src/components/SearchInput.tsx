import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuerry } from '../redux/actions/bookListActionCreators';
import { getSearchQuerry } from '../redux/selectors';

const SearchInput = ({ className, placeholder }: React.HTMLAttributes<HTMLInputElement>) => {
	const dispatch = useDispatch();
	const currentSearchQuerry = useSelector(getSearchQuerry);
	const [localSearchQuerry, setLocalSearchQuerry] = useState(currentSearchQuerry);
	const ref = useRef<Function>(() => {});

	const sendFunc = () => {
		dispatch(updateSearchQuerry(localSearchQuerry));
	};

	const debouncedDispatchQuerry = useMemo(
		() => debounce(() => {
			ref.current();
		},
		300), [],
	);

	useEffect(() => {
		ref.current = sendFunc;
	}, [localSearchQuerry]);

	const onChangeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSearchQuerry(e.target.value);
		debouncedDispatchQuerry();
	}, [debouncedDispatchQuerry]);

	const inputClass = `search-input${className ? ` ${className}` : ''}`;

	console.log('SearchInput render', currentSearchQuerry);

	return (
		<input
			className={inputClass}
			type="search"
			placeholder={placeholder}
			onChange={onChangeSearchInput}
			value={localSearchQuerry}
		/>
	);
};

export default SearchInput;

/*
const SearchInput = ({ className, placeholder }: React.HTMLAttributes<HTMLInputElement>) => {
	const dispatch = useDispatch();
	const debouncedDispatchQuerry = useMemo(
		() => debounce((value: string) => { dispatch(updateSearchQuerry(value)); }, 300),
		[],
	);

	const onChangeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedDispatchQuerry(e.target.value);
	}, [debouncedDispatchQuerry]);

	const inputClass = `search-input${className ? ` ${className}` : ''}`;

	return (
		<input
			className={inputClass}
			type="search"
			placeholder={placeholder}
			onChange={onChangeSearchInput}
		/>
	);
};
*/
