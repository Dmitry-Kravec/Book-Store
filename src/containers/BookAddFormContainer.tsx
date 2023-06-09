import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { addBookToCart } from "../redux/actions/shoppingCartActionCreators";
import { BookItemType } from "../types/BooksTypes";
import BookAddForm from "../components/BookAddForm"

type BookAddFormContainerProps = {
    book: BookItemType,
}

const BookAddFormContainer = ({book} : BookAddFormContainerProps) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const handleSubmit = useCallback((e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(quantity !== 0) {
            dispatch(addBookToCart(book, quantity));
            setQuantity(0);
        }
    }, [quantity])

    const handleQuantityInputChange = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(+value);
    }, [])

    const handleQuantityChange = useCallback((value: number) => {
        setQuantity((prevQuantity) => Math.max(prevQuantity + value, 0));
    }, [])

    const props = {
        handleSubmit,
        quantity,
        handleQuantityChange,
        handleQuantityInputChange,
    }

    return (
        <BookAddForm {...props} />
    )
}

export default BookAddFormContainer;