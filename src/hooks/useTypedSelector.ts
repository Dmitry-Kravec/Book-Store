import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ReduxStateType } from '../types/BooksTypes';

const useTypedSelector: TypedUseSelectorHook<ReduxStateType> = useSelector;

export default useTypedSelector;
