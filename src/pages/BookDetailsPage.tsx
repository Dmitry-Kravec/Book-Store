import { useParams } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchBookDetails } from '../requests/BooksRequests';
import { getSingleBookDetails } from '../redux/selectors';
import BookDetails from '../components/BookDetails';
import LoadingIndicator from '../components/LoadingIndicator';

const BookDetailsPage = () => {
	const { isbn13 } = useParams();
	const bookDetails = useSelector(getSingleBookDetails);
	const { isLoading, getBooksDetails } = useFetchBookDetails();

	useEffect(() => {
		const abortController = new AbortController();

		if (isbn13) {
			getBooksDetails(isbn13, abortController);
		}

		return () => abortController.abort();
	}, [isbn13, getBooksDetails]);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
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
