export default class BookStoreService {
  fetchNewBooks = async () => {
    const response = await fetch('https://api.itbook.store/1.0/new');
    const data = response.json();

    return data;
  }

  fetchBookDetails = async ({isbn13}: any) => {
    const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
    const data = response.json();

    return data;
  }

  fetchBooksQuerry = async ({querry}: any) => {
    const response = await fetch(`https://api.itbook.store/1.0/search/${querry}`);
    const data = response.json();

    return data;
  }
}