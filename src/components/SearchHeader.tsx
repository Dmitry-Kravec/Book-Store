import { ReactNode } from 'react';

type SearchHeaderProps = {
	currentView: string,
	currentSort: string,
	currentPublisherFilterValue: string,
	currentAuthorsFilterValue: string,
	onChangeValueInSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
	publishersOption: ReactNode[],
	authorsOption: ReactNode[],
	sortOption: ReactNode[],
	onChangeView: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
}

const SearchHeader = ({
	currentView,
	currentSort,
	currentPublisherFilterValue,
	currentAuthorsFilterValue,
	onChangeValueInSelect,
	publishersOption,
	authorsOption,
	sortOption,
	onChangeView,
} : SearchHeaderProps) => (
	<div className="search-header">
		<div className="search-header__label-container">
			<label htmlFor="publisher" className="search-header__label">
				Фильтр:
			</label>
			<select
				value={currentPublisherFilterValue}
				name="publisher"
				onChange={onChangeValueInSelect}
				className="search-header__select"
			>
				{publishersOption}
			</select>
			<select
				value={currentAuthorsFilterValue}
				name="authors"
				onChange={onChangeValueInSelect}
				className="search-header__select"
			>
				{authorsOption}
			</select>
		</div>
		<div className="search-header__block">
			<div className="search-header__label-container">
				<label htmlFor="sort" className="search-header__label">
					Сортировка:
				</label>
				<select
					value={currentSort}
					name="sort"
					onChange={onChangeValueInSelect}
					className="search-header__select"
				>
					{sortOption}
				</select>
			</div>
			<div className="view-toggle">
				<button className={`view-toggle__grid view-toggle__${currentView}`} type="button" aria-label="grid-toggle" value="grid" onClick={onChangeView} />
				<button className={`view-toggle__row view-toggle__${currentView}`} type="button" aria-label="row-toggle" value="row" onClick={onChangeView} />
			</div>
		</div>
	</div>
);

export default SearchHeader;

/*
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

  const sortOption = Object.values(SortEntries).map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  const onChangeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.name) {
      case "publisher":
        dispatch(changePublisherFilterValue(e.target.value));
        break;
      case "authors":
        dispatch(changeAuthorsFilterValue(e.target.value));
        break;
      case "sort":
        dispatch(changeSortType(mapSortEntryToSortType(e.target.value as SortEntries)));
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
            onChange={onChangeSelectValue}
            className="search-header__select"
          >
            {publishersOption}
          </select>
          <select
            value={currentAuthorsFilterValue}
            name="authors"
            onChange={onChangeSelectValue}
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
          value={mapSortTypeToSortEntry(sort)}
          name="sort"
          onChange={onChangeSelectValue}
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
*/
