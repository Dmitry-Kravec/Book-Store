import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BookList from "../components/BookList";
import SearchHeader from "../components/SearchHeader";

import { newBooksRequest } from "../redux/actions/bookListActionCreators";
import '../styles/book-list-page.scss'

import BookStoreService from "../services/bookStoreService";

const bookStoreService = new BookStoreService();

const BookListPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      newBooksRequest(bookStoreService, dispatch)
    },[dispatch])

    return (
        <article className='book-list-page'>
            <h3 className='book-list-page__header'>Каталог</h3>
            <SearchHeader />
            <BookList />
        </article>
    )
}

export default BookListPage;
