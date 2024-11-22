import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Author from './components/Author';
import Book from './components/Book';
import BookDetail from './components/BookDetail';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/categories' element={<Category/>} />
          <Route path='/authors' element={<Author/>} />
          <Route path='/books' element={<Book/>} />
          <Route path='/books/:slug' element={<BookDetail/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
