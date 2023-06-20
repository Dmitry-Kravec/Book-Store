import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { fetchBookDetailsSuccess, fetchNewBooksError, fetchNewBooksSuccess } from '../redux/actions/bookListActionCreators';
import { BookApiItemType, BookItemType, CustomBookFieldType } from '../types/BooksTypes';
import { getSearchQuerry } from '../redux/selectors';

const authors: CustomBookFieldType = [[
	'George Mathew Adams',
	'Bibi Jonson',
	'Trevor Phillips',
	'Mikael Retrofan',
	'Jojo Sorserer',
	'Alexander Abdulov',
	'Katy Vingston',
	'Rafael Kusto',
	'Harry Dubua',
	'Kim Kizuragi',
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
			const index = Math.floor(Math.random() * fieldValues.length);
			newBookItem[fieldName] = fieldValues[index];
		});

		booksWithFields.push(newBookItem as BookItemType);
	});

	return booksWithFields;
};

const useFetchNewBooks = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getNewBooks = useCallback(() => {
		setIsLoading(true);

		fetch('https://api.itbook.store/1.0/new')
			.then((response) => response.json())
			.then((json) => {
				const books = addCustomFields(json.books, customBookFields);

				dispatch(fetchNewBooksSuccess(books));
			})
			.catch((error) => console.log('useFetchNewBooks promise fetch error ', error))
			.finally(() => setIsLoading(false));
	}, []);

	return { isLoading, getNewBooks };
};

const useFetchBookDetails = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const getBooksDetails = useCallback((isbn13: string) => {
		setIsLoading(true);

		fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
			.then((response) => response.json())
			.then((json) => dispatch(fetchBookDetailsSuccess(json)))
			.catch((error) => console.log('useFetchBookDetails promise fetch error ', error))
			.finally(() => setIsLoading(false));
	}, [dispatch]);

	return { isLoading, getBooksDetails };
};

// const useSearchBooks = () => {
// 	const dispatch = useDispatch();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [searchQuerry, setSearchQuerry] = useState('');

// 	useEffect(() => {
// 		const abortController = new AbortController();

// 		if (searchQuerry !== '') {
// 			setTimeout(() => {
// 				if (!abortController.signal.aborted) {
// 					setIsLoading(true);

// 					fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`, { signal: abortController.signal })
// 						.then((response) => response.json())
// 						.then((json) => {
// 							const books = addCustomFields(json.books, customBookFields);
// 							console.log('FETCH SUCCESS:', json);
// 							dispatch(fetchNewBooksSuccess(books));
// 						})
// 						.catch((error: Error) => {
// 							console.log('useSearchBooks promise fetch error ', error);
// 						// if (error.name !== 'AbortError') {
// 						// 	setIsLoading(false);
// 						// }
// 						})
// 						.finally(() => setIsLoading(false));
// 				}
// 			}, 3000);
// 		}

// 		return () => abortController.abort();
// 	}, [searchQuerry, dispatch]);

// 	const getFilteredBooks = useCallback((searchQuerry: string) => {
// 		// setIsNeedNewRequest(true);
// 		setSearchQuerry(searchQuerry);
// 	}, []);

// 	return { isLoading, getFilteredBooks };
// };

// const useFetchBooks = () => {
// 	const searchQuerry = useSelector(getSearchQuerry);
// 	const { isLoading: isNewBooksLoading, getNewBooks } = useFetchNewBooks();
// 	const { isLoading: isSearchloading, getFilteredBooks } = useSearchBooks();

// 	console.log('useFetchBooks work');

// 	const fetchBooks = useCallback(() => {
// 		if (searchQuerry.length > 2) {
// 			getFilteredBooks(searchQuerry);
// 		} else if (searchQuerry === '') {
// 			getNewBooks();
// 		}
// 	}, [searchQuerry, getFilteredBooks, getNewBooks]);

// 	return {
// 		isLoading: isNewBooksLoading || isSearchloading,
// 		fetchBooks,
// 	};
// };

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
			.catch((error: Error) => {
				console.log('useSearchBooks promise fetch error ', error);
				if (error.name !== 'AbortError') {
					setIsLoading(false);
				} else {
					console.log('AbortError');
				}
			});
		// .finally(() => setIsLoading(false));
	}, [dispatch]);

	return { isLoading, getFilteredBooks };
};

const useFetchBooks = () => {
	const searchQuerry = useSelector(getSearchQuerry);
	const { isLoading: isNewBooksLoading, getNewBooks } = useFetchNewBooks();
	const { isLoading: isSearchLoading, getFilteredBooks } = useSearchBooks();

	console.log('useFetchBooks work');

	useEffect(() => {
		const abortController = new AbortController();
		if (searchQuerry.length > 2) {
			getFilteredBooks(searchQuerry, abortController);
		} else if (searchQuerry === '') {
			getNewBooks();
		}

		return () => abortController.abort();
	}, [searchQuerry, getFilteredBooks, getNewBooks]);

	// const abortController = new AbortController();

	// const fetchBooks = () => {
	// 	if (searchQuerry.length > 2) {
	// 		getFilteredBooks(searchQuerry, abortController);
	// 	} else if (searchQuerry === '') {
	// 		getNewBooks();
	// 	}
	// };

	return {
		isLoading: isNewBooksLoading || isSearchLoading,
		// fetchBooks,
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
