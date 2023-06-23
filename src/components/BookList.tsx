import { BookItemType, ViewType } from '../types/BooksTypes';

export type BookListItemProps = {
    book: BookItemType
}

type BookListProps = {
    booksData: BookItemType[],
    currentView: ViewType,
	ItemComponent: React.FunctionComponent<BookListItemProps>
}

const BookList = ({ booksData, currentView, ItemComponent }: BookListProps) => (
	<ul className={`book-list book-list_view_${currentView}`}>
		{
			booksData && booksData.map((book) => (
				<li key={book.isbn13} className="book-list__list-item">
					<ItemComponent book={book} />
				</li>
			))
		}
	</ul>
);

export default BookList;
