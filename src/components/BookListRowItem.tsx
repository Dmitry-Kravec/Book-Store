import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookItemType } from '../types/BooksTypes';

import { BookListItemProps } from './BookList';

const BookListRowItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher } = book;
	return (
		<div className="book-list__row-item">
			<img className="book-list__row-item-image" src={image} alt="TEXT" width="50" height="50" />
			<div className="book-list__row-item-description">
				<div className="book-list__row-item-title">{title}</div>
				<div className="book-list__row-item-subtitle">{subtitle}</div>
				<div className="book-list__row-item-authors">Authors: {authors}</div>
				<div className="book-list__row-item-publisher">Publisher: {publisher}</div>
				<div className="book-list__row-item-price">{price}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListRowItem;
