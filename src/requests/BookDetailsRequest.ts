import { isLeft } from 'fp-ts/lib/Either';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import {
	fetchBookDetailsRequested,
	fetchBookDetailsSuccess,
	fetchBookDetailsFailure,
} from '../redux/actions/bookDetailsActionCreators';
import {
	ReduxStateType,
	BookDetailsActionsType,
	ErrorNames,
	BookExtendedItemType,
	BookExtendedItemTypeRuntime,
} from '../types/BooksTypes';
import { addCustomFields } from '../utils/CustomFields';
import { showNotification } from '../utils/Notification';

export const fetchBookDetailsThunk = (
	isbn13: string,
	abortController: AbortController,
): ThunkAction<void, ReduxStateType, unknown, BookDetailsActionsType> =>
	(dispatch) => {
		dispatch(fetchBookDetailsRequested());

		fetch(`https://api.itbook.store/1.0/books/${isbn13}`, { signal: abortController.signal })
			.then((response) => {
				if (Math.random() < 0.5) {
					throw new Error('TEST ERROR');
				}

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				if (response.status === 404) {
					error.message = 'Книга не найдена';
					error.name = ErrorNames.notFound;
				}

				return Promise.reject(error);
			})
			.then((json: BookExtendedItemType) => {
				const booksWithCustomFields = addCustomFields([json])[0];

				if (isLeft(BookExtendedItemTypeRuntime.decode(booksWithCustomFields))) {
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
					dispatch(fetchBookDetailsSuccess(booksWithCustomFields));
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					dispatch(fetchBookDetailsFailure(error));
				}
			});
	};

export const useFetchBookDetails = () => {
	const dispatch = useDispatch();

	const getBooksDetails = useCallback((isbn13: string, abortController: AbortController) => {
		dispatch(fetchBookDetailsRequested());

		return fetch(`https://api.itbook.store/1.0/books/${isbn13}`, { signal: abortController.signal })
			.then((response) => {
				// if (Math.random() < 0.5) {
				// 	throw new Error('TEST ERROR');
				// }

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				if (response.status === 404) {
					error.message = 'Книга не найдена';
					error.name = ErrorNames.notFound;
				}

				return Promise.reject(error);
			})
			.then((json) => {
				const booksWithCustomFields = addCustomFields([json])[0];

				if (isLeft(BookExtendedItemTypeRuntime.decode(booksWithCustomFields))) {
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
					dispatch(fetchBookDetailsSuccess(booksWithCustomFields));
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					dispatch(fetchBookDetailsFailure(error));
				}
			});
	}, []);

	return { getBooksDetails };
};
