import { BookItemType, ViewType } from '../types/BooksTypes';

import '../styles/book-list.scss';

export type BookListItemProps = {
    book: BookItemType
}

type BookListProps = {
    booksData: BookItemType[],
    currentView: ViewType,
	ItemComponent: React.FunctionComponent<BookListItemProps>
}

const BookList = ({ booksData, currentView, ItemComponent }: BookListProps) => (
	<div className={`book-list book-list_view_${currentView}`}>
		{
			booksData && booksData.map((book) => (<ItemComponent key={book.isbn13} book={book} />))
		}
	</div>
);

export default BookList;
