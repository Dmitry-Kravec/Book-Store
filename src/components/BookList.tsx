import { BookItemType, ViewType } from '../types/BooksTypes';

export interface BookListItemProps {
    book: BookItemType,
	currentUTCOffset: number,
}

interface BookListProps {
    booksData: BookItemType[],
    currentView: ViewType,
	utcOffset: number,
	ItemComponent: React.FunctionComponent<BookListItemProps>
}

const BookList = ({ booksData, currentView, utcOffset, ItemComponent }: BookListProps) => (
	<ul className={`book-list book-list_view_${currentView}`}>
		{
			booksData && booksData.map((book) => (
				<li key={book.isbn13} className="book-list__list-item">
					<ItemComponent book={book} currentUTCOffset={utcOffset} />
				</li>
			))
		}
	</ul>
);

export default BookList;
