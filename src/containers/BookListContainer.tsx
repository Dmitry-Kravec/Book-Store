import { useSelector } from 'react-redux';
import { getSortedAndFilteredBooksData, getUTSOffset, getView } from '../redux/selectors';
import { useFetchBooks, useFetchBooksV2 } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

import useAbortController from '../hooks/useAbortController';

const BookListContainer = () => {
	const { isLoading, error, request } = useFetchBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);
	const utcOffset = useSelector(getUTSOffset);
	const abortController = useAbortController(request);

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	let content: React.ReactNode;

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} buttonHandler={() => request(abortController)} />
		);
	} else if (booksData.length) {
		content = (
			<BookList
				booksData={booksData}
				currentView={currentView}
				utcOffset={utcOffset}
				ItemComponent={ItemComponent}
			/>
		);
	} else {
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
	const utcOffset = useSelector(getUTSOffset);

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	let content: React.ReactNode;

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} buttonHandler={request} />
		);
	} else if (booksData.length) {
		content = (
			<BookList
				booksData={booksData}
				currentView={currentView}
				utcOffset={utcOffset}
				ItemComponent={ItemComponent}
			/>
		);
	} else {
		content = <div>Товары не найдены</div>;
	}

	return (
		<div className="book-list-container">
			{content}
		</div>
	);
};

export default BookListContainer;
