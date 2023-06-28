import { useParams } from 'react-router-dom';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchBookDetails } from '../requests/BooksRequests';
import { getSingleBookDetails } from '../redux/selectors';
import BookDetails from '../components/BookDetails';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const BookDetailsPage = () => {
	const { isbn13 } = useParams();
	const [lastRequestMethod, setLastRequestMethod] = useState<() => void>(() => {});
	const bookDetails = useSelector(getSingleBookDetails);
	const { isLoading, error, getBooksDetails } = useFetchBookDetails();

	const repeatLastRequest = useCallback(() => lastRequestMethod(), [lastRequestMethod]);

	useEffect(() => {
		const abortController = new AbortController();

		if (isbn13) {
			getBooksDetails(isbn13, abortController);
			setLastRequestMethod(() => () => getBooksDetails(isbn13, abortController));
		}

		return () => abortController.abort();
	}, [isbn13, getBooksDetails]);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
	} else if (error) {
		content = <Error error={error} buttonHandler={repeatLastRequest} />;
	} else if (bookDetails) {
		content = <BookDetails bookDetails={bookDetails} />;
	}

	return (
		<div className="book-details-page">
			{content}
		</div>
	);
};

export default BookDetailsPage;
