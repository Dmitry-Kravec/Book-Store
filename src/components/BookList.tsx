import { BookItemType } from '../types/BooksTypes';
import BookListItem from './BookListItem';

import '../styles/book-list.scss';

type BookListProps = {
    booksData: BookItemType[],
    currentView?: string,
}

const BookList = ({ booksData, currentView }: BookListProps) => (
	<div className="book-list--view--grid">
		{
			booksData && booksData.map((book) => (<BookListItem key={book.isbn13} book={book} />))
		}
	</div>
);

export default BookList;
