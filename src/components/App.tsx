import { Routes, Route } from 'react-router-dom';

import AppHeader from './AppHeader';
import BookListPage from '../pages/BookListPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';

import '../styles/app.scss';

function App() {
  console.log("RENder APP");
  
  return (
    <div className="app">
      <AppHeader />
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<BookListPage />} />
          <Route path='/cart' element={<ShoppingCartPage />} />
          <Route path='*' element={<h2>404 Not Found</h2>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
