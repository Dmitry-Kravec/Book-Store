import { BookItemType } from "../types/BooksTypes";
import BookListItem from "./BookListItem";

import '../styles/book-list.scss';

type BookListProps = {
    booksData: BookItemType[],
    currentView?: string
}

const BookList = ({ booksData }: BookListProps) => {
    //console.log('BookList');
    return (
        <div className='book-list--view--grid'>
            {
                booksData && booksData.map((book) => {
                    return (<BookListItem key={book.isbn13} book={book} />)
                })
            }
        </div>
    )
}

export default BookList;