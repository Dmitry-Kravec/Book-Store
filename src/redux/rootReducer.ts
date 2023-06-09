import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { shoppingCartReducer } from './shoppingCartReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  shoppingCart: shoppingCartReducer,
})

export default rootReducer;