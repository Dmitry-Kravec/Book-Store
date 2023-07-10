import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLeft } from 'fp-ts/lib/Either';
import {
	fetchBooksFailure,
	fetchBooksRequested,
	fetchBooksSuccess,
} from '../redux/actions/bookListActionCreators';
import {
	ErrorNames,
	BookSearchResponseTypeRuntime,
	BookSearchResponseType,
	BookItemType,
	BookApiItemType,
} from '../types/BooksTypes';
import { getBooksDataRequestError, getSearchQuerry } from '../redux/selectors';
import { showNotification } from '../utils/Notification';
import { addCustomFields } from '../utils/CustomFields';
import useAbortController from '../hooks/useAbortController';
import useTypedDispatch from '../hooks/useTypedDispatch';

const useBooksRequest = () => {
	const dispatch = useTypedDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const getBooks = useCallback((
		fetchBooks: () => Promise<Response>,
	) => {
		setIsLoading(true);
		setError(null);
		dispatch(fetchBooksRequested());

		fetchBooks()
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
			.then((json: BookSearchResponseType) => {
				console.log('json: ', json);

				if (isLeft(BookSearchResponseTypeRuntime.decode(json))) {
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
					dispatch(fetchBooksSuccess(addCustomFields<BookItemType, BookApiItemType>(json.books)));
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					setError(error);
				}
			})
			.finally(() => { setIsLoading(false); });
	}, []);

	return { isLoading, error, getBooks };
};

const searchBooksFetch = (abortController: AbortController, searchQuerry: string) =>
	fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`, { signal: abortController.signal });

const newBooksFetch = (abortController: AbortController) =>
	fetch('https://api.itbook.store/1.0/new', { signal: abortController.signal });

const useFetchBooks = () => {
	const searchQuerry = useSelector(getSearchQuerry);

	const { isLoading, error, getBooks } = useBooksRequest();

	const request = useCallback((abortController: AbortController) => {
		if (searchQuerry.length > 2) {
			getBooks(() => searchBooksFetch(abortController, searchQuerry));
		} else if (searchQuerry === '') {
			getBooks(() => newBooksFetch(abortController));
		}
	}, [searchQuerry, getBooks]);

	const requestWithAbortController = useAbortController(request);
	useEffect(() => {
		requestWithAbortController();
	}, [requestWithAbortController]);

	return {
		isLoading,
		error: searchQuerry.length > 0 && searchQuerry.length <= 2 ? null : error,
		requestWithAbortController,
	};
};

// ----------------
// Старая версия:

const useFetchNewBooks = () => {
	const dispatch = useTypedDispatch();
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
			.then((json: BookSearchResponseType) => {
				if (isLeft(BookSearchResponseTypeRuntime.decode(json))) {
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
					dispatch(fetchBooksFailure(error));
				}
			})
			.finally(() => { setIsLoading(false); });
	}, []);

	return { isLoading, getNewBooks };
};

const useSearchBooks = () => {
	const dispatch = useTypedDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getFilteredBooks = useCallback((searchQuerry: string, abortController: AbortController) => {
		setIsLoading(true);
		dispatch(fetchBooksRequested());

		fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`, { signal: abortController.signal })
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
			.then((json: BookSearchResponseType) => {
				if (isLeft(BookSearchResponseTypeRuntime.decode(json))) {
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
					dispatch(fetchBooksFailure(error));
				}
			})
			.finally(() => { setIsLoading(false); });
	}, []);

	return { isLoading, getFilteredBooks };
};

const useFetchBooksV1 = () => {
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

	const requestWithAbortController = useAbortController(request);
	useEffect(() => {
		requestWithAbortController();
	}, [requestWithAbortController]);

	return {
		isLoading: isNewBooksLoading || isSearchLoading,
		error: searchQuerry.length > 0 && searchQuerry.length <= 2 ? null : booksRequestError,
		requestWithAbortController,
	};
};

export { useFetchBooks };
