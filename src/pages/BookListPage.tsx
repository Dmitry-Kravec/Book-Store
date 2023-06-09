import BookListContainer from "../containers/BookListContainer";
import SearchHeader from "../components/SearchHeader";

import '../styles/book-list-page.scss'

const BookListPage = () => {
    return (
        <article className='book-list-page'>
            <h3 className='book-list-page__header'>Каталог</h3>
            <SearchHeader />
            <BookListContainer />
        </article>
    )
}

export default BookListPage;
