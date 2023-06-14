import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookItemType } from '../types/BooksTypes';

type BookListItemProps = {
    book: BookItemType
}

const BookListItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher } = book;
	return (
		<div className="book-list__item">
			<img className="book-list__item-image" src={image} alt="TEXT" width="200" height="200" />
			<div className="book-list__item-description">
				<div className="book-list__item-title">{title}</div>
				<div className="book-list__item-subtitle">{subtitle}</div>
				<div className="book-list__item-authors">Authors: {authors}</div>
				<div className="book-list__item-publisher">Publisher: {publisher}</div>
				<div className="book-list__item-price">{price}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListItem;
