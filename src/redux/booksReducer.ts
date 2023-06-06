import { BookListTypes, BooksStateType } from "../types/BooksTypes"
import { FETCH_NEW_BOOKS, FETCH_NEW_BOOKS_ERROR, FETCH_NEW_BOOKS_SUCCESS } from "./actionConstants"

const initialState: BooksStateType = {
  booksData: [],
  areBooksLoading: false,
  hasBooksLoadingError: false,
}


const BooksReducer = (state = initialState, action: BookListTypes): BooksStateType => {
  switch(action.type) {
    case FETCH_NEW_BOOKS:
      return {
        ...state,
        booksData: [],
        areBooksLoading: true,
        hasBooksLoadingError: false,
      }
    case FETCH_NEW_BOOKS_SUCCESS:
      return {
        ...state,
        booksData: action.payload,
        areBooksLoading: false,
      }
    case FETCH_NEW_BOOKS_ERROR:
      return {
        ...state,
        areBooksLoading: false,
        hasBooksLoadingError: true,
      }
    default:
      return state;
  }
}

export default BooksReducer;