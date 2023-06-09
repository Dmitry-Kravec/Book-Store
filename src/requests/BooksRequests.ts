import { useCallback, useState } from "react"
import { useDispatch } from "react-redux";
import { fetchBookDetailsSuccess, fetchNewBooksError, fetchNewBooksSuccess } from "../redux/actions/bookListActionCreators";
import { BookApiItemType, BookItemType, CustomBookFieldType } from "../types/BooksTypes";

const authors: CustomBookFieldType = [[
    "George Mathew Adams",
    "Bibi Jonson",
    "Trevor Phillips",
    "Mikael Retrofan",
    "Jojo Sorserer",
    "Alexander Abdulov",
    "Katy Vingston",
    "Rafael Kusto",
    "Harry Dubua",
    "Kim Kizuragi"
], "authors"]

const publisher: CustomBookFieldType = [[
    "Packt Publishing",
    "Apress",
    "Springer",
    "Syncfusion",
    "Self-publishing",
], "publisher"]

const customBookFields = [authors, publisher];

const addCustomFields = (books: BookApiItemType[], fields: CustomBookFieldType[] ) => {
    const booksWithFields: BookItemType[] = [];

    books.forEach((book) => {
        const newBookItem: any = {
            ...book,
        }

        fields.forEach(([fieldValues, fieldName]) => {
            const index = Math.floor(Math.random() * fieldValues.length)
            newBookItem[fieldName] = fieldValues[index];
        })

        booksWithFields.push(newBookItem as BookItemType)
    })

    return booksWithFields;
}

const useFetchNewBooks = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getNewBooks = useCallback(() => {
        setIsLoading(true);

        fetch('https://api.itbook.store/1.0/new')
            .then((response) => response.json())
            .then((json) => {
                const books = addCustomFields(json.books, customBookFields);

                dispatch(fetchNewBooksSuccess(books))
            })
            .catch((error) => console.log("useFetchNewBooks promise fetch error ", error))
            .finally(() => setIsLoading(false))
    }, [])

    return { isLoading, getNewBooks };
}

const useFetchBookDetails = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getBooksDetails = useCallback((isbn13: string) => {
        setIsLoading(true);

        fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
            .then((response) => response.json())
            .then((json) => dispatch(fetchBookDetailsSuccess(json)))
            .catch((error) => console.log("useFetchBookDetails promise fetch error ", error))
            .finally(() => setIsLoading(false))
    }, [])

    return { isLoading, getBooksDetails };
}

const useFetchFilteredBooks = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getFilteredBooks = useCallback((searchQuerry: string) => {
        setIsLoading(true);

        fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`)
            .then((response) => response.json())
            .then((json) => dispatch(fetchNewBooksSuccess(json.books)))
            .catch((error) => console.log("useFetchFilteredBooks promise fetch error ", error))
            .finally(() => setIsLoading(false))
    }, [])

    return { isLoading, getFilteredBooks };
}

export { useFetchNewBooks, useFetchBookDetails, useFetchFilteredBooks };


// const useFetchNewBooksWithFullInfo = () => {
//     const dispatch = useDispatch();
//     const [isLoading, setIsLoading] = useState(false);

//     const getNewBooks = useCallback(() => {
//         setIsLoading(true);

//         fetch('https://api.itbook.store/1.0/new')
//             .then((response) => response.json())
//             .then((json) => {
//                 return Promise.allSettled(
//                     json.books.map((book: BookItemType) => fetch(`https://api.itbook.store/1.0/books/${book.isbn13}`))
//                 );
//                 dispatch(fetchNewBooksSuccess(json.books))
//             })
//             .then((booksData: Array<PromiseFulfilledResult<BookItemType> | PromiseRejectedResult>) => {
//                 const fullfieldedPromiseArr = booksData.filter((p) => p.status === 'fulfilled') as PromiseFulfilledResult<BookItemType>[];

//                 console.log("booksData",booksData);
//             })
//             .catch((error) => console.log("useFetchNewBooks promise fetch error" + error))
//             .finally(() => setIsLoading(false))
//     }, [])

//     return { isLoading, getNewBooks };
// }