import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { getSortedAndFilteredBooksData, getView } from '../redux/selectors';
import { useFetchBooks, useFetchBooksV2 } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';
import LoadingIndicator from '../components/LoadingIndicator';

import Error from '../components/Error';

const BookListContainer = () => {
	const { isLoading, error, request } = useFetchBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);
	const [currentAC, setAC] = useState<AbortController>(new AbortController());

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	useEffect(() => {
		const abortController = new AbortController();

		setAC(abortController);

		return () => abortController.abort();
	}, [request]);

	let content = (
		<BookList
			booksData={booksData}
			currentView={currentView}
			ItemComponent={ItemComponent}
		/>
	);

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} buttonHandler={() => request(currentAC)} />
		);
	} else if (!booksData.length) {
		content = <div>Товары не найдены</div>;
	}

	return (
		<div className="book-list-container">
			{content}
		</div>
	);
};

const BookListContainerV2 = () => {
	const { isLoading, error, request } = useFetchBooksV2();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	let content = (
		<BookList
			booksData={booksData}
			currentView={currentView}
			ItemComponent={ItemComponent}
		/>
	);

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} buttonHandler={request} />
		);
	} else if (!booksData.length) {
		content = <div>Товары не найдены</div>;
	}

	return (
		<div className="book-list-container">
			{content}
		</div>
	);
};

export default BookListContainer;
