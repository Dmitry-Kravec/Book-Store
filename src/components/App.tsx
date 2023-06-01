import React from 'react';
import '../styles/App.css';


import BookStoreService from '../services/bookStoreService';

function App() {

  console.log(BookStoreService.bookList)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
