import * as t from 'io-ts';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLeft } from 'fp-ts/lib/Either';
import {
	fetchBooksFailure,
	fetchBooksRequested,
	fetchBooksSuccess,
} from '../redux/actions/bookListActionCreators';
import {
	ErrorNames,
	BookApiItemTypeRuntime,
} from '../types/BooksTypes';
import { getBooksDataRequestError, getSearchQuerry } from '../redux/selectors';
import { showNotification } from '../utils/Notification';
import { addCustomFields } from '../utils/CustomFields';

const useFetchNewBooks = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getNewBooks = useCallback((abortController: AbortController) => {
		setIsLoading(true);
		dispatch(fetchBooksRequested());

		fetch('https://api.itbook.store/1.0/new', { signal: abortController.signal })
			.then((response) => {
				// if (Math.random() < 0.4) {
				// 	throw new Error('TEST ERROR');
				// }

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				return Promise.reject(error);
			})
			.then((json) => {
				setIsLoading(false);

				if (isLeft(t.array(BookApiItemTypeRuntime).decode(json.books))) {
					const error: Error = {
						message: 'Произошла ошибка обработки данных',
						name: ErrorNames.validationError,
					};

					showNotification({
						message: error.message,
						type: 'error',
					});
					throw error;
				} else {
					dispatch(fetchBooksSuccess(addCustomFields(json.books)));
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					dispatch(fetchBooksFailure(error));
				}
			});
	}, []);

	return { isLoading, getNewBooks };
};

const useSearchBooks = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getFilteredBooks = useCallback((searchQuerry: string, abortController: AbortController) => {
		setIsLoading(true);
		dispatch(fetchBooksRequested());

		fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`, { signal: abortController.signal })
			.then((response) => {
				if (Math.random() < 0.4) {
					throw new Error('TEST ERROR');
				}

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				return Promise.reject(error);
			})
			.then((json) => {
				setIsLoading(false);

				if (isLeft(t.array(BookApiItemTypeRuntime).decode(json.books))) {
					const error: Error = {
						message: 'Произошла ошибка обработки данных',
						name: ErrorNames.validationError,
					};

					showNotification({
						message: error.message,
						type: 'error',
					});

					throw error;
				} else {
					dispatch(fetchBooksSuccess(addCustomFields(json.books)));
				}
			})
			.catch((error) => {
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					dispatch(fetchBooksFailure(error));
				}
			});
	}, []);

	return { isLoading, getFilteredBooks };
};

const useFetchBooks = () => {
	const searchQuerry = useSelector(getSearchQuerry);
	const booksRequestError = useSelector(getBooksDataRequestError);

	const {
		isLoading: isNewBooksLoading,
		getNewBooks,
	} = useFetchNewBooks();
	const {
		isLoading: isSearchLoading,
		getFilteredBooks,
	} = useSearchBooks();

	const request = useCallback((abortController: AbortController) => {
		if (searchQuerry.length > 2) {
			getFilteredBooks(searchQuerry, abortController);
		} else if (searchQuerry === '') {
			getNewBooks(abortController);
		}
	}, [searchQuerry, getFilteredBooks, getNewBooks]);

	useEffect(() => {
		const abortController = new AbortController();

		request(abortController);

		return () => abortController.abort();
	}, [request]);

	return {
		isLoading: isNewBooksLoading || isSearchLoading,
		error: booksRequestError,
		request,
	};
};

const useFetchBooksV2 = () => {
	// версия, в которой храним последний запрос в состоянии,
	// чтобы потом при необходимости вызвать его ещё раз
	const searchQuerry = useSelector(getSearchQuerry);
	const booksRequestError = useSelector(getBooksDataRequestError);

	const {
		isLoading: isNewBooksLoading,
		getNewBooks,
	} = useFetchNewBooks();
	const {
		isLoading: isSearchLoading,
		getFilteredBooks,
	} = useSearchBooks();

	const [lastRequestMethod, setLastRequestMethod] = useState<() => void>(() => {});

	const request = useCallback(() => {
		lastRequestMethod();
	}, [lastRequestMethod]);

	useEffect(() => {
		const abortController = new AbortController();

		if (searchQuerry.length > 2) {
			getFilteredBooks(searchQuerry, abortController);
			setLastRequestMethod(() => () => getFilteredBooks(searchQuerry, abortController));
		} else if (searchQuerry === '') {
			getNewBooks(abortController);
			setLastRequestMethod(() => () => getNewBooks(abortController));
		}

		return () => abortController.abort();
	}, [searchQuerry, getFilteredBooks, getNewBooks]);

	return {
		isLoading: isNewBooksLoading || isSearchLoading,
		error: booksRequestError,
		request,
	};
};

export { useFetchNewBooks, useSearchBooks, useFetchBooks, useFetchBooksV2 };

// const useFetchNewBooksWithFullInfo = () => {
//     const dispatch = useDispatch();
//     const [isLoading, setIsLoading] = useState(false);

//     const getNewBooks = useCallback(() => {
//         setIsLoading(true);

//         fetch('https://api.itbook.store/1.0/new')
//             .then((response) => response.json())
//             .then((json) => {
//                 return Promise.allSettled(
//                     json.books.map((book: BookItemType) => fetch(`https://api.itbook.store/1.0/books/${book.isbn13}`))
//                 );
//                 dispatch(fetchBooksSuccess(json.books))
//             })
//      .then((booksData: Array<PromiseFulfilledResult<BookItemType> | PromiseRejectedResult>) => {
// 			const fullfieldedPromiseArr = booksData
//		 .filter((p) => p.status === 'fulfilled') as PromiseFulfilledResult<BookItemType>[];

//                 console.log("booksData",booksData);
//             })
//             .catch((error) => console.log("useFetchNewBooks promise fetch error" + error))
//             .finally(() => setIsLoading(false))
//     }, [])

//     return { isLoading, getNewBooks };
// }
