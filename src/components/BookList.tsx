import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BookItemType } from '../types/BooksTypes';
import { getUtcOffset, getView } from '../redux/selectors';
import BookListGridItem from './BookListGridItem';
import BookListRowItem from './BookListRowItem';

interface BookListProps {
	booksData: BookItemType[],
}

const BookList = ({ booksData }: BookListProps) => {
	const currentView = useSelector(getView);
	const utcOffset = useSelector(getUtcOffset);
	const Component = useMemo(() => (currentView === 'grid' ? BookListGridItem : BookListRowItem), [currentView]);

	return (
		<ul className={`book-list book-list_view_${currentView}`}>
			{
				booksData && booksData.map((book) => (
					<li key={book.isbn13} className="book-list__list-item">
						<Component book={book} currentUtcOffset={utcOffset} />
					</li>
				))
			}
		</ul>
	);
};

export default memo(BookList);
