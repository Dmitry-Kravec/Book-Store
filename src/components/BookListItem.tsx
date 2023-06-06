const BookListItem = () => {
    return (
        <div className='book-list__item'>
            <img className='book-list__item-image' src='https://www.adorebooks.in/wp-content/uploads/2022/02/You-Can.jpg' alt='TEXT' width='200' height='200'></img>
            <div className='book-list__item-description'>
                <div className='book-list__item-title'>Тёмная сторона белой мысли</div>
                <div className='book-list__item-author'>George Mathew Adams</div>
                <div className='book-list__item-genre'>Fantasy</div>
                <div className='book-list__item-price'>2340р</div>
                <form>
                    {/* кнопки */}
                </form>
            </div>
        </div>
    )
}

export default BookListItem;