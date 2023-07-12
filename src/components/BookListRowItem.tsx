import moment from 'moment';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import BookAddFormContainer from '../containers/BookAddFormContainer';

import { dateTimeFormat, serverDateTimeFormat } from '../constants';
import { BookItemType } from '../types/BooksTypes';
import { getFormattedPrice, onImageError } from '../utils/helpers';

interface BookListRowItemProps {
	book: BookItemType,
	currentUtcOffset: number,
}

const BookListRowItem = ({ book, currentUtcOffset }: BookListRowItemProps) => {
	const { image, price, subtitle, title, authors, publisher, isbn13, date } = book;

	const dateWithOffset = moment.utc(date, serverDateTimeFormat).utcOffset(currentUtcOffset).format(dateTimeFormat);

	return (
		<div className="book-list-row-item">
			<img
				className="book-list-row-item__image"
				src={image}
				onError={onImageError}
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
			<div className="book-list-row-item__price">{getFormattedPrice(price)}</div>
			<div className="book-list-row-item__add-form">
				<BookAddFormContainer book={book} />
			</div>
		</div>
	);
};

export default memo(BookListRowItem);
