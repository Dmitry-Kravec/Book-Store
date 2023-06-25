import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sample } from 'lodash';

import {
	fetchBookDetailsRequested,
	fetchBookDetailsSuccess,
	fetchNewBooksSuccess,
} from '../redux/actions/bookListActionCreators';
import { BookApiItemType, BookItemType, CustomBookFieldType } from '../types/BooksTypes';
import { getSearchQuerry } from '../redux/selectors';
import { showNotification } from '../components/Notification';

const authors: CustomBookFieldType = [[
	'George Mathew Adams',
	'Bibi Jonson',
	'Ricardo Milos',
	'Mikael Retrofan',
	'Jojo Sorserer',
	'Alexander Abdulov',
	'Katy Vingston',
	'Rafael Kusto',
	'Harry Dubua',
	'Tekila Sunset',
], 'authors'];

const publisher: CustomBookFieldType = [[
	'Packt Publishing',
	'Apress',
	'Springer',
	'Syncfusion',
	'Self-publishing',
], 'publisher'];

const customBookFields = [authors, publisher];

const addCustomFields = (books: BookApiItemType[], fields: CustomBookFieldType[]) => {
	const booksWithFields: BookItemType[] = [];

	books.forEach((book) => {
		const newBookItem: any = {
			...book,
		};

		fields.forEach(([fieldValues, fieldName]) => {
			newBookItem[fieldName] = sample(fieldValues);
		});

		booksWithFields.push(newBookItem as BookItemType);
	});

	return booksWithFields;
};

const useFetchNewBooks = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getNewBooks = useCallback((abortController: AbortController) => {
		setIsLoading(true);

		fetch('https://api.itbook.store/1.0/new', { signal: abortController.signal })
			.then((response) => response.json())
			.then((json) => {
				const books = addCustomFields(json.books, customBookFields);

				dispatch(fetchNewBooksSuccess(books));
			})
			.catch((error) => {
				console.log('useFetchNewBooks promise fetch error ', error);
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					showNotification({
						message: error.status,
						type: 'error',
					});
				} else {
					console.log('AbortError');
				}
			})
			.finally(() => setIsLoading(false));
	}, []);

	return { isLoading, getNewBooks };
};

const useFetchBookDetails = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getBooksDetails = useCallback((isbn13: string, abortController: AbortController) => {
		setIsLoading(true);
		dispatch(fetchBookDetailsRequested());

		fetch(`https://api.itbook.store/1.0/books/${isbn13}`, { signal: abortController.signal })
			.then((response) => {
				console.log('then', response);

				return response.json();
			})
			.then((json) => dispatch(fetchBookDetailsSuccess(json)))
			.catch((error) => {
				console.log('useFetchBookDetails fetch error ');
				console.log(error);
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					showNotification({
						message: error.toString(),
						type: 'error',
					});
				} else {
					console.log('AbortError');
				}
			})
			.finally(() => setIsLoading(false));
	}, []);

	return { isLoading, getBooksDetails };
};

const useSearchBooks = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getFilteredBooks = useCallback((searchQuerry: string, abortController: AbortController) => {
		setIsLoading(true);

		fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`, { signal: abortController.signal })
			.then((response) => response.json())
			.then((json) => {
				const books = addCustomFields(json.books, customBookFields);
				setIsLoading(false);
				console.log('FETCH SUCCESS:', searchQuerry, ' ', json);
				dispatch(fetchNewBooksSuccess(books));
			})
			.catch((error) => {
				console.log('useSearchBooks promise fetch error ', error);
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					showNotification({
						message: error.status,
						type: 'error',
					});
				} else {
					console.log('AbortError');
				}
			});
	}, []);

	return { isLoading, getFilteredBooks };
};

const useFetchBooks = () => {
	const searchQuerry = useSelector(getSearchQuerry);
	const { isLoading: isNewBooksLoading, getNewBooks } = useFetchNewBooks();
	const { isLoading: isSearchLoading, getFilteredBooks } = useSearchBooks();

	useEffect(() => {
		const abortController = new AbortController();
		if (searchQuerry.length > 2) {
			getFilteredBooks(searchQuerry, abortController);
		} else if (searchQuerry === '') {
			getNewBooks(abortController);
		}

		return () => abortController.abort();
	}, [searchQuerry, getFilteredBooks, getNewBooks]);

	return {
		isLoading: isNewBooksLoading || isSearchLoading,
	};
};

export { useFetchNewBooks, useFetchBookDetails, useSearchBooks, useFetchBooks };

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
//                 dispatch(fetchNewBooksSuccess(json.books))
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
