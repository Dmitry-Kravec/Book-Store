import { type } from "os"

export type BookItemType = {
  id: number,
  title: string,
  authors: string[],
  price: number,
  imageUrl: string,
};

export type BooksStateType = {
  booksData: BookItemType[]
}