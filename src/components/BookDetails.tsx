import { memo } from 'react';
import { BookExtendedItemType } from '../types/BooksTypes';
import BookAddFormContainer from '../containers/BookAddFormContainer';
import NavigationBackButton from './NavigationBackButton';

import { getFormattedPrice, onImageError } from '../utils/helpers';

interface BookDetailsProps {
	bookDetails: BookExtendedItemType;
}

const BookDetails = ({ bookDetails }: BookDetailsProps) => {
	const {
		title,
		subtitle,
		image,
		price,
		authors,
		publisher,
		pages,
		year,
		rating,
		desc,
	} = bookDetails;

	return (
		<div className="book-details">
			<div className="book-details__header-container">
				<NavigationBackButton />
				<div className="book-details__header">
					<div className="book-details__title">{title}</div>
					<div className="book-details__subtitle">{subtitle}</div>
				</div>
			</div>
			<div className="book-details__content">
				<div className="book-details__content-left">
					<img
						className="book-details__image"
						src={image}
						onError={onImageError}
						alt="book"
						width="300"
						height="300"
					/>
					<BookAddFormContainer book={bookDetails} />
				</div>
				<table className="book-details__info-table">
					<tbody>
						<tr>
							<th>Authors:</th>
							<td>{authors}</td>
						</tr>
						<tr>
							<th>Publisher:</th>
							<td>{publisher}</td>
						</tr>
						<tr>
							<th>Pages:</th>
							<td>{pages}</td>
						</tr>
						<tr>
							<th>Year:</th>
							<td>{year}</td>
						</tr>
						<tr>
							<th>Price:</th>
							<td>{getFormattedPrice(price)}</td>
						</tr>
						<tr>
							<th>Rating:</th>
							<td>{rating}</td>
						</tr>
						<tr>
							<td colSpan={2} className="book-details__description">
								<span className="book-details__description-title">Description:</span>
								{desc}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default memo(BookDetails);
