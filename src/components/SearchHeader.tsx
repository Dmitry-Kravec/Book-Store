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
	onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
	onChangeSearchInput,
} : SearchHeaderProps) => (
	<div className="search-header">
		<div className="search-header__block">
			<input
				className="search-header__search-input"
				type="search"
				placeholder="Найти книгу..."
				onChange={onChangeSearchInput}
			/>
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
