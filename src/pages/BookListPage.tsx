import BookListContainer from '../containers/BookListContainer';
import SearchHeaderContainer from '../containers/SearchHeaderContainer';

import '../styles/book-list-page.scss';

const BookListPage = () => (
	<article className="book-list-page">
		<h3 className="book-list-page__header">Каталог</h3>
		<SearchHeaderContainer />
		<BookListContainer />
	</article>
);

export default BookListPage;
