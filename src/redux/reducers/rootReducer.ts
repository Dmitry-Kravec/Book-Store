import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import shoppingCartReducer from './shoppingCartReducer';
import bookDetailsReducer from './bookDetailsReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	shoppingCart: shoppingCartReducer,
	bookDetails: bookDetailsReducer,
});

export default rootReducer;
