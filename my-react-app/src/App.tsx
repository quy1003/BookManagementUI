import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Author from './components/Authors';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/categories' element={<Category/>} />
          <Route path='/authors' element={<Author/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
