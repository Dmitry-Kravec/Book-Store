//import { type } from "os"
import * as bookListActions from '../redux/actions/bookListActionCreators'

/*
authors : "Saurabh Shrivastava, Neelanjali Srivastav, Alberto Artasanchez, Imtiaz Sayed"
desc : "Are you excited to harness the power of AWS and unlock endless possibilities for your business? Look no further than the second edition of AWS for Solutions Architects! Packed with all-new content, this book is a must-have guide for anyone looking to build scalable cloud solutions and drive digital ..."
error : "0"
image : "https://itbook.store/img/books/9781803238951.png"
isbn10 : "180323895X"
isbn13: "9781803238951"
language: "English"
pages: "692"
price: "$43.99"
publisher: "Packt Publishing"
rating: "0"
subtitle: "The definitive guide to AWS Solutions Architecture for migrating to, building, scaling, and succeeding in the cloud"
title: "AWS for Solutions Architects, 2nd Edition"
url: "https://itbook.store/books/9781803238951"
year: "2023"
*/


export type BookItemType = {
  image: string,
  isbn13: string,
  price: string,
  subtitle: string,
  title: string,
};

export type BookExtendedItemType = BookItemType & {
   authors: string, //
   publisher: string,
   pages: string, //
   year: string,
   rating: string,
   desc: string,
};

export type BooksStateType = {
  booksData: BookItemType[],
  areBooksLoading: boolean,
  hasBooksLoadingError: boolean,
}

export type BookListTypes = ReturnType<
  typeof bookListActions.fetchNewBooks |
  typeof bookListActions.fetchNewBooksSuccess |
  typeof bookListActions.fetchNewBooksError |
  typeof bookListActions.fetchBookDetails |
  typeof bookListActions.fetchBookDetailsSuccess |
  typeof bookListActions.fetchBookDetailsError
>;