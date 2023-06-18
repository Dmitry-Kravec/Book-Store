import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getBooksData, getSortedAndFilteredBooksData, getView } from '../redux/selectors';
import { useFetchNewBooks } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';

const BookListContainer = () => {
	const { isLoading, getNewBooks } = useFetchNewBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	useEffect(() => {
		getNewBooks();
	}, [getNewBooks]);

	if (isLoading) return (<div>Loading...</div>);

	if (!booksData.length) return (<div>Товары не найдены</div>);

	// if(hasBooksLoadingError) return (<div>Error</div>)
	// console.log('BookListContainer');

	return (
		<BookList booksData={booksData} currentView={currentView} ItemComponent={ItemComponent} />
	);
};

export default BookListContainer;
