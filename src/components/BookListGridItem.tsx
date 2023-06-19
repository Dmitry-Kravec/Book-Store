import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookListItemProps } from './BookList';

const BookListGridItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher } = book;
	return (
		<div className="book-list-grid-item">
			<img className="book-list-grid-item__image" src={image} alt="TEXT" width="200" height="200" />
			<div className="book-list-grid-item__description">
				<div className="book-list-grid-item__title">{title}</div>
				<div className="book-list-grid-item__subtitle">{subtitle}</div>
				<div className="book-list-grid-item__authors">Authors: {authors}</div>
				<div className="book-list-grid-item__publisher">Publisher: {publisher}</div>
				<div className="book-list-grid-item__price">{price}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListGridItem;
