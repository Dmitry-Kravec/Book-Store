import { useDispatch, useSelector } from "react-redux";
import { SortType } from "../types/BooksTypes";
import { changeAuthorsFilterValue, changePublisherFilterValue, changeSortType } from "../redux/actions/bookListActionCreators";
import { getAllAuthors, getAllPublishers, getAuthorsFilterValue, getPublisherFilterValue, getSort } from "../redux/selectors";

const SearchHeader = () => {
    const dispatch = useDispatch();

    const sort = useSelector(getSort);
    const currentPublisherFilterValue = useSelector(getPublisherFilterValue);
    const currentAuthorsFilterValue = useSelector(getAuthorsFilterValue);
    const publishers = useSelector(getAllPublishers);
    const authors = useSelector(getAllAuthors);

    const publishersOption = publishers.map((el) => {
        return <option key={el} value={el}>{el}</option>
    })

    const authorsOption = authors.map((el) => {
        return <option key={el} value={el}>{el}</option>
    })

    const sortOption = Object.values(SortType).map((el) => {
        return <option key={el} value={el}>{el}</option>
    })

    const changeSortTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.name) {
            case 'publisher':
                dispatch(changePublisherFilterValue(e.target.value))
                break;
            case 'authors':
                dispatch(changeAuthorsFilterValue(e.target.value))
                break;
            case 'sort':
                dispatch(changeSortType(e.target.value as SortType));
                break;
        }
    }

    return (
        <div className='search-header__container'>
            <label className='search-header__label'>
                Фильтр:
                <select value={currentPublisherFilterValue} name="publisher" onChange={changeSortTypeHandler}>
                    {publishersOption}
                </select>

                <select value={currentAuthorsFilterValue} name='authors' onChange={changeSortTypeHandler}>
                    {authorsOption}
                </select>
            </label>
            <label className='search-header__label'>
                Сортировка:
                <select value={sort} name="sort" onChange={changeSortTypeHandler}>
                    {sortOption}
                </select>
            </label>
            <div className='view-toggle'>Вид</div>
        </div>
    )
}

export default SearchHeader;