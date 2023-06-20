import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getBooksData, getSortedAndFilteredBooksData, getView } from '../redux/selectors';
import { useFetchBooks } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';

const BookListContainer = () => {
	const { isLoading } = useFetchBooks();
	const booksData = useSelector(getSortedAndFilteredBooksData);
	const currentView = useSelector(getView);

	const ItemComponent = currentView === 'grid' ? BookListGridItem : BookListRowItem;

	// useEffect(() => {
	// 	fetchBooks();
	// }, [fetchBooks]);

	let content = (
		<BookList booksData={booksData} currentView={currentView} ItemComponent={ItemComponent} />);

	if (isLoading) content = (<div>Loading...</div>);

	if (!booksData.length) content = (<div>Товары не найдены</div>);

	return (
		<div className="book-list-container">
			{content}
		</div>
	);
};

export default BookListContainer;
