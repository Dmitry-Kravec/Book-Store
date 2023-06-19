import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookListItemProps } from './BookList';

const BookListRowItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher } = book;
	return (
		<div className="book-list-row-item">
			<img className="book-list-row-item__image" src={image} alt="TEXT" width="50" height="50" />
			<div className="book-list-row-item__block book-list-row-item__title-subtitle">
				<div className="book-list-row-item__title">{title}</div>
				<div className="book-list-row-item__subtitle">{subtitle}</div>
			</div>
			<div className="book-list-row-item__block book-list-row-item__authors-publisers">
				<div className="book-list-row-item__authors">Authors: {authors}</div>
				<div className="book-list-row-item__publisher">Publisher: {publisher}</div>
			</div>
			<div className="book-list-row-item__price">{price}</div>
			<div className="book-list-row-item__add-form">
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListRowItem;
