import { useParams } from 'react-router-dom';
import { ReactNode, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchBookDetails, fetchBookDetailsThunk } from '../requests/BookDetailsRequest';
import { getBookDetails, getBookDetailsError, getBookDetailsIsLoading } from '../redux/selectors';
import BookDetails from '../components/BookDetails';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import { resetBookDetailsInfo } from '../redux/actions/bookDetailsActionCreators';
import useAbortController from '../hooks/useAbortController';
import useTypedDispatch from '../hooks/useTypedDispatch';

// V2 with Thunk
const BookDetailsPage = () => {
	const { id: isbn13 } = useParams();

	const dispatch = useTypedDispatch();
	const bookDetails = useSelector(getBookDetails);
	const isLoading = useSelector(getBookDetailsIsLoading);
	const error = useSelector(getBookDetailsError);

	const request = useCallback((abortController: AbortController) => {
		if (isbn13) {
			dispatch(fetchBookDetailsThunk(isbn13, abortController));
		}
	}, [isbn13]);

	const requestWithAbortController = useAbortController(request);

	useEffect(() => {
		requestWithAbortController();
	}, [requestWithAbortController]);

	useEffect(() => () => { dispatch(resetBookDetailsInfo()); }, []);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
	} else if (error) {
		content = (
			<Error
				error={error}
				buttonHandler={requestWithAbortController}
			/>
		);
	} else if (bookDetails) {
		content = <BookDetails bookDetails={bookDetails} />;
	}

	return (
		<div className="book-details-page">
			{content}
		</div>
	);
};

// V1 with Hooks and using local state
const BookDetailsPageV1 = () => {
	const { id: isbn13 } = useParams();

	const { isLoading, error, bookDetails, getBooksDetails } = useFetchBookDetails();

	const request = useCallback((abortController: AbortController) => {
		if (isbn13) {
			getBooksDetails(isbn13, abortController);
		}
	}, [isbn13]);

	const requestWithAbortController = useAbortController(request);

	useEffect(() => {
		requestWithAbortController();
	}, [requestWithAbortController]);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
	} else if (error) {
		content = <Error error={error} buttonHandler={requestWithAbortController} />;
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
