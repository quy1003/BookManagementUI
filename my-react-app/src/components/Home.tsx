import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import bookLogo from '../assets/book.svg'
import categoryLogo from '../assets/category.svg'
import authorLogo from '../assets/author-sign.svg'
const Home = () => {
  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to Book Library Manager</h1>
      <Link to="/books">
        <img src={bookLogo} className="logo react" alt="Book logo" />
      </Link>
      <Link to="/categories">
        <img src={categoryLogo} className="logo react" alt="Category logo" />
      </Link>
      <Link to="/authors">
        <img src={authorLogo} className="logo react" alt="Author logo" />
      </Link>
    </div>
  );
};

export default Home;
