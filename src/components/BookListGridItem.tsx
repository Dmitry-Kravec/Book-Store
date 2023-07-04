import moment from 'moment';
import { NavLink } from 'react-router-dom';
import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookListItemProps } from './BookList';

import defaultBookImage from '../images/default-book.png';
import { dateTimeFormat, serverDateTimeFormat } from '../constants';

const BookListGridItem = ({ book }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher, isbn13, date } = book;
	const formattedPrice = Number(price.slice(1)) === 0 ? 'Free' : price;
	const localDate = moment.utc(date, serverDateTimeFormat).local().format(dateTimeFormat);

	return (
		<div className="book-list-grid-item">
			<img
				className="book-list-grid-item__image"
				src={image}
				onError={(e) => {
					e.currentTarget.onerror = null;
					e.currentTarget.src = defaultBookImage;
				}}
				alt="book"
				width="200"
				height="200"
			/>
			<div className="book-list-grid-item__description">
				<NavLink to={`/product/${isbn13}`} className="book-list-grid-item__title-link">
					{title}
				</NavLink>
				<div className="book-list-grid-item__subtitle">{subtitle}</div>
				<div className="book-list-grid-item__date">
					Date: {localDate}
				</div>
				<div className="book-list-grid-item__authors">Authors: {authors}</div>
				<div className="book-list-grid-item__publisher">Publisher: {publisher}</div>
				<div className="book-list-grid-item__price">{formattedPrice}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default BookListGridItem;
