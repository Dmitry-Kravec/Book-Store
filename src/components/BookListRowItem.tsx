import moment from 'moment';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { BookListItemProps } from './BookList';
import BookAddFormContainer from '../containers/BookAddFormContainer';

import defaultBookImage from '../images/default-book.png';
import { dateTimeFormat, serverDateTimeFormat } from '../constants';

const BookListRowItem = ({ book, currentUTCOffset }: BookListItemProps) => {
	const { image, price, subtitle, title, authors, publisher, isbn13, date } = book;
	const formattedPrice = Number(price.slice(1)) === 0 ? 'Free' : price;

	const dateWithOffset = moment.utc(date, serverDateTimeFormat).utcOffset(currentUTCOffset).format(dateTimeFormat);

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
					Date: {dateWithOffset}
				</div>
			</div>
			<div className="book-list-row-item__price">{formattedPrice}</div>
			<div className="book-list-row-item__add-form">
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default memo(BookListRowItem);
