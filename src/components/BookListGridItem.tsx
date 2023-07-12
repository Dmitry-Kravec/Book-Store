import moment from 'moment';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import BookAddFormContainer from '../containers/BookAddFormContainer';

import { dateTimeFormat, serverDateTimeFormat } from '../constants';
import { BookItemType } from '../types/BooksTypes';
import { getFormattedPrice, onImageError } from '../utils/helpers';

interface BookListGridItemProps {
	book: BookItemType,
	currentUtcOffset: number,
}

const BookListGridItem = ({ book, currentUtcOffset }: BookListGridItemProps) => {
	const { image, price, subtitle, title, authors, publisher, isbn13, date } = book;

	const dateWithOffset = moment.utc(date, serverDateTimeFormat).utcOffset(currentUtcOffset).format(dateTimeFormat);

	return (
		<div className="book-list-grid-item">
			<img
				className="book-list-grid-item__image"
				src={image}
				onError={onImageError}
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
					Date: {dateWithOffset}
				</div>
				<div className="book-list-grid-item__authors">Authors: {authors}</div>
				<div className="book-list-grid-item__publisher">Publisher: {publisher}</div>
				<div className="book-list-grid-item__price">{getFormattedPrice(price)}</div>
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default memo(BookListGridItem);
