import BookAddFormContainer from '../containers/BookAddFormContainer';
import { BookExtendedItemType } from '../types/BooksTypes';
import NavigationBackButton from './NavigationBackButton';

import defaultBookImage from '../images/default-book.png';

type BookDetailsProps = {
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

	const formattedPrice = Number(price.slice(1)) === 0 ? 'Free' : price;

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
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = defaultBookImage;
						}}
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
							<td>{formattedPrice}</td>
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

export default BookDetails;
