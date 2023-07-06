import { useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { useFetchBookDetails, fetchBookDetailsThunk } from '../requests/BookDetailsRequest';
import { getBookDetails, getBookDetailsError, getBookDetailsIsLoading } from '../redux/selectors';
import BookDetails from '../components/BookDetails';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import { BookListActionsType, ReduxStateType } from '../types/BooksTypes';
import { resetBookDetailsInfo } from '../redux/actions/bookDetailsActionCreators';

// V2 with Thunk
const BookDetailsPage = () => {
	const { isbn13 } = useParams();

	const dispatch: ThunkDispatch<ReduxStateType, unknown, BookListActionsType> & Dispatch<AnyAction> = useDispatch();
	const bookDetails = useSelector(getBookDetails);
	const isLoading = useSelector(getBookDetailsIsLoading);
	const error = useSelector(getBookDetailsError);

	const [lastDispatch, setLastDispatch] = useState<() => void>(() => {});

	useEffect(() => {
		const abortController = new AbortController();

		if (isbn13) {
			dispatch(fetchBookDetailsThunk(isbn13, abortController));
			setLastDispatch(() => () => {
				dispatch(fetchBookDetailsThunk(isbn13, abortController));
			});
		}

		return () => abortController.abort();
	}, [isbn13]);

	useEffect(() => () => { dispatch(resetBookDetailsInfo()); }, []);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
	} else if (error) {
		content = (
			<Error
				error={error}
				buttonHandler={lastDispatch}
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

// V1 with Hooks
const BookDetailsPageV1 = () => {
	const { isbn13 } = useParams();

	const dispatch = useDispatch();
	const bookDetails = useSelector(getBookDetails);
	const isLoading = useSelector(getBookDetailsIsLoading);
	const error = useSelector(getBookDetailsError);

	const { getBooksDetails } = useFetchBookDetails();

	const [lastRequest, setLastRequest] = useState<() => void>(() => {});

	useEffect(() => {
		const abortController = new AbortController();

		if (isbn13) {
			getBooksDetails(isbn13, abortController);
			setLastRequest(() => () => getBooksDetails(isbn13, abortController));
		}

		return () => abortController.abort();
	}, [isbn13, getBooksDetails]);

	useEffect(() => () => { dispatch(resetBookDetailsInfo()); }, []);

	let content: ReactNode;

	if (isLoading) {
		content = <LoadingIndicator />;
	} else if (error) {
		content = <Error error={error} buttonHandler={lastRequest} />;
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
