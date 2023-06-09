export default class BookStoreService {
  getNewBooks = async () => {
    const response = await fetch('https://api.itbook.store/1.0/new');
    const data = response.json();

    return data;
  }

  getBookDetails = async (isbn13: string) => {
    const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
    const data = response.json();

    return data;
  }

  getFilteredBooks = async (searchQuerry: string) => {
    const response = await fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`);
    const data = response.json();

    return data;
  }
}