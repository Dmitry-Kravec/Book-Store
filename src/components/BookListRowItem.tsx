import moment from 'moment';
import { NavLink } from 'react-router-dom';
import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookListItemProps } from './BookList';

import defaultBookImage from '../images/default-book.png';
import { dateTimeFormat, serverDateTimeFormat } from '../constants';

const BookListRowItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher, isbn13, date } = book;
	const formattedPrice = Number(price.slice(1)) === 0 ? 'Free' : price;
	const localDate = moment.utc(date, serverDateTimeFormat).local().format(dateTimeFormat);

	return (
		<div className="book-list-row-item">
			<img
				className="book-list-row-item__image"
				src={image}
				onError={(e) => {
					e.currentTarget.onerror = null;
					e.currentTarget.src = defaultBookImage;
				}}
				alt="book"
				width="50"
				height="50"
			/>
			<div className="book-list-row-item__block book-list-row-item__title-subtitle">
				<NavLink className="book-list-row-item__title-link" to={`/product/${isbn13}`}>
					{title}
				</NavLink>
				<div className="book-list-row-item__subtitle">{subtitle}</div>
			</div>
			<div className="book-list-row-item__block book-list-row-item__authors-publisers">
				<div className="book-list-row-item__authors">Authors: {authors}</div>
				<div className="book-list-row-item__publisher">Publisher: {publisher}</div>
				<div className="book-list-row-item__date">
					Date: {localDate}
				</div>
			</div>
			<div className="book-list-row-item__price">{formattedPrice}</div>
			<div className="book-list-row-item__add-form">
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListRowItem;
