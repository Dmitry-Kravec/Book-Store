import { useDispatch } from 'react-redux';
import { DispatchType } from '../types/BooksTypes';

const useTypedDispatch = () => useDispatch<DispatchType>();

export default useTypedDispatch;
