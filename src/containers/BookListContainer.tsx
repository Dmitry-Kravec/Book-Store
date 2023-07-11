import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getSortedAndFilteredBooksData, getUTCOffset, getView } from '../redux/selectors';
import { useFetchBooks } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const BookListContainer = () => {
	const { isLoading, error, requestWithAbortController } = useFetchBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);
	const utcOffset = useSelector(getUTCOffset);

	const ItemComponent = useMemo(() => (currentView === 'grid' ? BookListGridItem : BookListRowItem), [currentView]);

	let content: React.ReactNode;

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} buttonHandler={requestWithAbortController} />
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
