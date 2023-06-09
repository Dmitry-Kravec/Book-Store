import { TypedUseSelectorHook, useSelector } from "react-redux"
import { ReduxStateType } from "../types/BooksTypes"

export const useTypedSelector: TypedUseSelectorHook<ReduxStateType> = useSelector