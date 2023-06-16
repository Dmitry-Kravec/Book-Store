import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookItemType } from '../types/BooksTypes';

import { BookListItemProps } from './BookList';

const BookListGridItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher } = book;
	return (
		<div className="book-list__grid-item">
			<img className="book-list__grid-item-image" src={image} alt="TEXT" width="200" height="200" />
			<div className="book-list__grid-item-description">
				<div className="book-list__grid-item-title">{title}</div>
				<div className="book-list__grid-item-subtitle">{subtitle}</div>
				<div className="book-list__grid-item-authors">Authors: {authors}</div>
				<div className="book-list__grid-item-publisher">Publisher: {publisher}</div>
				<div className="book-list__grid-item-price">{price}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListGridItem;
