import * as bookListActions from '../redux/actions/bookListActionCreators';
import * as shoppingCartActions from '../redux/actions/shoppingCartActionCreators';
import rootReducer from '../redux/rootReducer';

/*
	authors : "Saurabh Shrivastava, Neelanjali Srivastav, Alberto Artasanchez, Imtiaz Sayed"
	desc : "Are you excited to harness the power of AWS a
		nd unlock endless possibilities for your business? Look
		no further than the second edition of AWS for Solutions
		Architects! Packed with all-new content, this book is
		a must-have guide for anyone looking to build scalable cloud solutions and drive digital ..."
	error : "0"
	image : "https://itbook.store/img/books/9781803238951.png"
	isbn10 : "180323895X"
	isbn13: "9781803238951"
	language: "English"
	pages: "692"
	price: "$43.99"
	publisher: "Packt Publishing"
	rating: "0"
	subtitle: "The definitive guid
		e to AWS Solutions Architecture for migra
		ting to, building, scaling, and succeeding in the cloud"
	title: "AWS for Solutions Architects, 2nd Edition"
	url: "https://itbook.store/books/9781803238951"
	year: "2023"
*/

export type ReduxStateType = ReturnType<typeof rootReducer>

export type CustomBookFieldType = [fieldValues: string[], fieldName: string]

export type BookApiItemType = {
	image: string,
	isbn13: string,
	price: string,
	subtitle: string,
	title: string,
};

export type BookItemType = BookApiItemType & {
	authors: string,
	publisher: string,
};

export type BookExtendedItemType = BookItemType & {
	pages: string,
	year: string,
	rating: string,
	desc: string,
};

export enum SortField {
	authors = 'authors',
	publisher = 'publisher',
	price = 'price',
}

export enum SortMethod {
	asc = 'asc',
	dsc = 'dsc',
}

export type SortType = {
	field?: SortField,
	direction?: SortMethod,
}

export type FilterableFields = 'authors' | 'publisher';

export type FiltersType = Record<FilterableFields, string>;

export type ViewType = 'grid' | 'row';

export type BooksStateType = {
	booksData: BookItemType[],
	searchQuerry: string,
	sort: SortType,
	filters: FiltersType,
	view: ViewType,

	singleBookDetails: BookExtendedItemType | null,
}

export type BookListActionsType = ReturnType<
	typeof bookListActions.changeView |
	typeof bookListActions.changeSortType |
	typeof bookListActions.changePublisherFilterValue |
	typeof bookListActions.changeAuthorsFilterValue |
	typeof bookListActions.updateSearchQuerry |
	typeof bookListActions.fetchNewBooksSuccess |
	typeof bookListActions.fetchNewBooksError |
	typeof bookListActions.fetchBookDetailsSuccess |
	typeof bookListActions.fetchBookDetailsError
	>;

export type ShoppingCartBookItemType = {
	book: BookItemType,
	quantity: number,
}

export type ShoppingCartStateType = {
	selectedBooks: ShoppingCartBookItemType[]
}

export type ShoppingCartActionsType = ReturnType<
	typeof shoppingCartActions.updateBookInCart
>
