import { useSelector } from 'react-redux';

import { getSortedAndFilteredBooksData, getView } from '../redux/selectors';
import { useFetchBooks } from '../requests/BooksRequests';
import BookList from '../components/BookList';
import BookListGridItem from '../components/BookListGridItem';
import BookListRowItem from '../components/BookListRowItem';
import LoadingIndicator from '../components/LoadingIndicator';

const BookListContainer = () => {
	const { isLoading } = useFetchBooks();
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

	if (!booksData.length) content = (<div>Товары не найдены</div>);

	if (isLoading) content = (<LoadingIndicator />);

	return (
		<div className="book-list-container">
			{content}
		</div>
	);
};

export default BookListContainer;
