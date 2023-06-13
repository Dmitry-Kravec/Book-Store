import { useEffect } from "react";

import { getBooksData, getSortedAndFilteredBooksData } from "../redux/selectors";
import { useFetchNewBooks, } from "../requests/BooksRequests";
import { useTypedSelector } from "../hooks/useTypedSelector";
import BookList from "../components/BookList";

const BookListContainer = () => {
    const { isLoading, getNewBooks } = useFetchNewBooks();
    const booksData = useTypedSelector(getSortedAndFilteredBooksData)
    //const booksData = useTypedSelector(getBooksData)

    useEffect(() => {
        getNewBooks();
    }, [])

    if (isLoading) return (<div>Loading...</div>);

    //if(hasBooksLoadingError) return (<div>Error</div>)
    //console.log('BookListContainer');

    return (
        <BookList booksData={booksData} />
    )
}

export default BookListContainer;