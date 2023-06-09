import { Routes, Route, Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';
import BookListPage from '../pages/BookListPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';

import '../styles/app.scss';

// сделать layout react router

const Layout = () => {
  return (
    <div className='app'>
      <AppHeader />
      <div className='page-content'>
        <Outlet />
      </div>
      <footer className='footer'>
        <a href='#' className='footer__git-link'>Git</a>
        <div className='footer__copyright'>@C</div>
        <div className='footer__year'>2023</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<BookListPage />}/>
          <Route path='cart' element={<ShoppingCartPage />} />
          <Route path='*' element={<h2>404 Not Found</h2>} />
        </Route>
      </Routes>
    </>
  )

  return (
    <div className='app'>
      <AppHeader />
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<BookListPage />} />
          <Route path='/cart' element={<ShoppingCartPage />} />
          <Route path='*' element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
