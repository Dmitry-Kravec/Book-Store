import {combineReducers} from 'redux';
import BooksReducer from './booksReducer';

const rootReducer = combineReducers({
  Books: BooksReducer
})

export default rootReducer;