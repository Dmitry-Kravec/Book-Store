const SearchHeader = () => {
    return (
        <div className='search-header__container'>
            <label className='search-header__label'>
                Фильтр:
                <select value='genre' name='' id=''>
                    <option value='genre'>Жанр</option>
                    <option value='year'>Год выхода</option>
                    <option value='author'>Автор</option>
                </select>
            </label>
            <label className='search-header__label'>
                Сортировка:
                <select value='genre' name='' id=''>
                    <option value='genre-inc'>Жанр (по убыванию)</option>
                    <option value='genre-desc'>Жанр (по возрастанию)</option>
                    <option value='year-inc'>Год выхода (по убыванию)</option>
                    <option value='year-desc'>Год выхода (по возрастанию)</option>
                    <option value='author-default'>Автор (А - Я)</option>
                    <option value='author-reverse'>Автор (Я - А)</option>
                </select>
            </label>
            <div className='view-toggle'>Вид</div>
        </div>
    )
}

export default SearchHeader;