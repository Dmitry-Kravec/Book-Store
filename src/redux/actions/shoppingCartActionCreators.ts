import { BookItemType, ShoppingCartBookItemType } from "../../types/BooksTypes";
import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from "../actionConstants";

export const addBookToCart = (book: BookItemType, quantity: number) => ({
    type: ADD_BOOK_TO_CART,
    payload: {
        book,
        quantity,
    },
})

export const removeBookFromCart = (isbn13: string, quantity: number) => {
    const book = {isbn13} as BookItemType;

    return {
        type: REMOVE_BOOK_FROM_CART,
        payload: {
            book,
            quantity,
        },
    }
}
