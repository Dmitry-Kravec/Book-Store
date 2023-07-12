import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as t from 'io-ts';
import * as bookListActions from '../redux/actions/bookListActionCreators';
import * as shoppingCartActions from '../redux/actions/shoppingCartActionCreators';
import * as bookDetailsActions from '../redux/actions/bookDetailsActionCreators';
import rootReducer from '../redux/reducers/rootReducer';

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
		date: t.string,
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

export const BookSearchResponseTypeRuntime = t.type({
	books: t.array(BookApiItemTypeRuntime),
});

export type BookSearchResponseType = t.TypeOf<typeof BookSearchResponseTypeRuntime>;

export type BookApiItemType = t.TypeOf<typeof BookApiItemTypeRuntime>;

export type BookItemType = t.TypeOf<typeof BookItemTypeRuntime>;

export type BookExtendedItemType = t.TypeOf<typeof BookExtendedItemTypeRuntime>;

export type CustomBookFieldType = [fieldValues: string[], fieldName: string];

export enum ErrorNames {
	network = 'networkError',
	notFound = 'notFoundError',
	validationError = 'validationError',
	abortError = 'AbortError',
	fetchError = 'TypeError',
	error = 'Error',
}

export enum SortField {
	authors = 'authors',
	publisher = 'publisher',
	price = 'price',
	date = 'date'
}

export enum SortMethod {
	asc = 'asc',
	dsc = 'dsc',
}

export type SortType = {
	field?: SortField,
	direction?: SortMethod,
}

export type ExactFilterableFields = 'authors' | 'publisher';
export type RangedFilterableFields = 'date';
export type RangedFilterValueType = { rangeStart?: string, rangeEnd?: string };

export type FilterableFields = ExactFilterableFields | RangedFilterableFields;

export type SimpleFiltersType = Record<ExactFilterableFields, string>;
export type RangedFiltersType = Record<RangedFilterableFields, RangedFilterValueType>;

export type FiltersType = SimpleFiltersType & RangedFiltersType;

export type ViewType = 'grid' | 'row';

export type BooksStateType = {
	booksData: BookItemType[],
	booksDataRequestError: null | Error,
	searchQuerry: string,
	sort: SortType,
	filters: FiltersType,
	utcOffset: number,
	view: ViewType,
}

export type BookListActionsType = ReturnType<
	typeof bookListActions.changeView |
	typeof bookListActions.changeSortType |
	typeof bookListActions.changePublisherFilterValue |
	typeof bookListActions.changeAuthorsFilterValue |
	typeof bookListActions.changeDateFilterValue |
	typeof bookListActions.updateSearchQuerry |
	typeof bookListActions.setUtcOffset |
	typeof bookListActions.fetchBooksRequested |
	typeof bookListActions.fetchBooksSuccess |
	typeof bookListActions.fetchBooksFailure
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

export type BookDetailsStateType = {
	book: BookExtendedItemType | null,
	isLoading: boolean,
	error: Error | null,
}

export type BookDetailsActionsType = ReturnType<
	typeof bookDetailsActions.fetchBookDetailsRequested |
	typeof bookDetailsActions.fetchBookDetailsSuccess |
	typeof bookDetailsActions.fetchBookDetailsFailure |
	typeof bookDetailsActions.resetBookDetailsInfo
>

export type ReduxStateType = ReturnType<typeof rootReducer>

export type ReduxActionsType = BookListActionsType | ShoppingCartActionsType | BookDetailsActionsType;

export type DispatchType = ThunkDispatch<ReduxStateType, unknown, ReduxActionsType> & Dispatch<ReduxActionsType>;
