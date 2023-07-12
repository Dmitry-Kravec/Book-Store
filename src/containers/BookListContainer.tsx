import { useSelector } from 'react-redux';
import { getSortedAndFilteredBooksData, getUtcOffset, getView } from '../redux/selectors';
import { useFetchBooks } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const BookListContainer = () => {
	const { isLoading, error, requestWithAbortController } = useFetchBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);

	let content: React.ReactNode;

	if (isLoading) {
		content = (<LoadingIndicator />);
	} else if (error) {
		content = (
			<Error error={error} onButtonClick={requestWithAbortController} />
		);
	} else if (booksData.length) {
		content = (
			<BookList
				booksData={booksData}
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
