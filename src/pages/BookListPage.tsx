import BookListContainer from '../containers/BookListContainer';
import SearchHeaderContainer from '../containers/SearchHeaderContainer';

const BookListPage = () => (
	<article className="book-list-page">
		<h3 className="book-list-page__header">Каталог</h3>
		<div className="book-list-page__content">
			<SearchHeaderContainer />
			<BookListContainer />
		</div>
	</article>
);

export default BookListPage;
