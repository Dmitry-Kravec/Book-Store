// сейчас не используется
export default class BookStoreService {
	static async getNewBooks2() {
		const response = await fetch('https://api.itbook.store/1.0/new');
		const data = response.json();

		return data;
	}

	static async getBookDetails2(isbn13: string) {
		const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
		const data = response.json();

		return data;
	}

	static async getFilteredBooks3(searchQuerry: string) {
		const response = await fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`);
		const data = response.json();

		return data;
	}

	// getNewBooks = async () => {
	// 	const response = await fetch('https://api.itbook.store/1.0/new');
	// 	const data = response.json();

	// 	return data;
	// };

	// getBookDetails = async (isbn13: string) => {
	// 	const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
	// 	const data = response.json();

	// 	return data;
	// };

	// getFilteredBooks = async (searchQuerry: string) => {
	// 	const response = await fetch(`https://api.itbook.store/1.0/search/${searchQuerry}`);
	// 	const data = response.json();

	// 	return data;
	// };
}
