import { Routes, Route } from 'react-router-dom';

import BookListPage from '../pages/BookListPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import Layout from './Layout';

import '../styles/style.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<BookListPage />} />
				<Route path="cart" element={<ShoppingCartPage />} />
				<Route path="product/:isbn13" element={<BookDetailsPage />} />
				<Route path="*" element={<h2>404 Not Found</h2>} />
			</Route>
		</Routes>
	);
}

export default App;
