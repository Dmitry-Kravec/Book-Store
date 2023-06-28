import * as t from 'io-ts';
import * as bookListActions from '../redux/actions/bookListActionCreators';
import * as shoppingCartActions from '../redux/actions/shoppingCartActionCreators';
import rootReducer from '../redux/rootReducer';

export const BookApiItemTypeRuntime = t.type({
	image: t.string,
	isbn13: t.string,
	price: t.string,
	subtitle: t.string,
	title: t.string,
});

export const BookItemTypeRuntime = t.intersection([
	BookApiItemTypeRuntime,
	t.type({
		authors: t.string,
		publisher: t.string,
	}),
]);

export const BookExtendedItemTypeRuntime = t.intersection([
	BookItemTypeRuntime,
	t.type({
		pages: t.string,
		year: t.string,
		rating: t.string,
		desc: t.string,
	}),
]);

export type BookApiItemType = t.TypeOf<typeof BookApiItemTypeRuntime>;

export type BookItemType = t.TypeOf<typeof BookItemTypeRuntime>;

export type BookExtendedItemType = t.TypeOf<typeof BookExtendedItemTypeRuntime>;

export enum ErrorNames {
	network = 'networkError',
	notFound = 'notFoundError',
	validationError = 'validationError',
	abortError = 'AbortError',
	fetchError = 'TypeError',
	error = 'Error',
}

export type ReduxStateType = ReturnType<typeof rootReducer>

export type CustomBookFieldType = [fieldValues: string[], fieldName: string]

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
	booksDataRequestError: null | Error,
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
	typeof bookListActions.fetchBooksRequested |
	typeof bookListActions.fetchBooksSuccess |
	typeof bookListActions.fetchBooksFailure |
	typeof bookListActions.fetchBookDetailsRequested |
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
