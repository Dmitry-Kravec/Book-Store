import { useDispatch, useSelector } from "react-redux";
import { SortType } from "../types/BooksTypes";
import {
  changeAuthorsFilterValue,
  changePublisherFilterValue,
  changeSortType,
} from "../redux/actions/bookListActionCreators";
import {
  getAllAuthors,
  getAllPublishers,
  getAuthorsFilterValue,
  getPublisherFilterValue,
  getSort,
} from "../redux/selectors";

import "../styles/search-header.scss";

const SearchHeader = () => {
  const dispatch = useDispatch();

  const sort = useSelector(getSort);
  const currentPublisherFilterValue = useSelector(getPublisherFilterValue);
  const currentAuthorsFilterValue = useSelector(getAuthorsFilterValue);
  const publishers = useSelector(getAllPublishers);
  const authors = useSelector(getAllAuthors);

  const publishersOption = publishers.map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  const authorsOption = authors.map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  const sortOption = Object.values(SortType).map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  const changeSortTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.name) {
      case "publisher":
        dispatch(changePublisherFilterValue(e.target.value));
        break;
      case "authors":
        dispatch(changeAuthorsFilterValue(e.target.value));
        break;
      case "sort":
        dispatch(changeSortType(e.target.value as SortType));
        break;
    }
  };

  return (
    <div className="search-header">
      <div className="search-header__label-container search-header__label-container_groving">
        <label htmlFor="publisher" className="search-header__label">
          Фильтр:
        </label>
        <select
            value={currentPublisherFilterValue}
            name="publisher"
            onChange={changeSortTypeHandler}
            className="search-header__select"
          >
            {publishersOption}
          </select>
          <select
            value={currentAuthorsFilterValue}
            name="authors"
            onChange={changeSortTypeHandler}
            className="search-header__select"
          >
            {authorsOption}
          </select>
      </div>
      <div className="search-header__label-container search-header__label-container_margin-rigth_auto">
        <label htmlFor="sort" className="search-header__label">
          Сортировка:
        </label>
        <select
          value={sort}
          name="sort"
          onChange={changeSortTypeHandler}
          className="search-header__select"
        >
          {sortOption}
        </select>
      </div>
      <div className="view-toggle">
        <a className="view-toggle__grid"></a>
        <a className="view-toggle__row"></a>
      </div>
    </div>
  );
};

export default SearchHeader;
