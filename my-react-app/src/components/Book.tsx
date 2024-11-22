import { useState, useEffect } from "react";
import api, { endpoints } from "../config/api";
import Loading from "./Loading";
import CircularIndeterminate from "./Spinner";
import { Link } from "react-router-dom";

interface Author {
  _id: string;
  name: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Book {
  _id: string;
  name: string;
  categories: Category[];
  authors: Author[];
  images: string[];
  release: string;
  description: string;
  slug: string;
}

const BookComponent = () => {
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false)
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoints["books"]);
      if (response.status === 200) {
        setBooksList(response.data.books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await api.get(endpoints["authors"]);
      if (response.status === 200) {
        setAuthorsList(response.data);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(endpoints["categories"]);
      if (response.status === 200) {
        setCategoriesList(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", bookName);
    formData.append("description", description);
    formData.append("release", releaseDate);
    formData.append("authors", JSON.stringify(selectedAuthors));
    formData.append("categories", JSON.stringify(selectedCategories));
    images.forEach((image) => formData.append("images", image));

    try {
      setSubmitLoading(true)
      const response = await api.post(endpoints["books"], formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        fetchBooks();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
    finally{
      setSubmitLoading(false)
    }
  };
  const dltSubmit = async(slug:string) => {
  try{
    setSubmitLoading(true)
    const response = await api.delete(endpoints['book'](slug))
    if(response.status === 200){
      fetchBooks();
    }
  }
  catch(ex:any){
    console.error(ex.response.data.message)
  }
  finally{
    setSubmitLoading(false)
  }
  }

  const resetForm = () => {
    setBookName("");
    setDescription("");
    setReleaseDate("");
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setImages([]);
  };

  return (
    <div>
      {submitLoading === false ? <>
      <h1 style={{ color: 'orange',marginTop:'-30px', position:'relative' }}>Book Management</h1>
            <a href="/categories/" style={{position:'absolute', right: '10px', top:'10px'}}>Go to categories page</a>
            <a href="/authors/" style={{position:'absolute', left: '10px', top:'10px'}}>Go to authors page</a>
            <p style={{marginTop:'-30px', textAlign:'justify', backgroundColor:'lightyellow'}}><i>*All of these fields must be included in the value properly. You have to create a category and an author before using this function, just access these page and the data will be loaded automatically. You can choose multiple values of authors or categories as long as you choose the one at least💡</i></p>
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter you book's name ..."
            value={bookName}
            style={{width:'30%', minWidth:'300px', padding:'5px'}}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Note your description about the book ..."
            value={description}
            style={{width:'30.1%', marginTop:'10px', padding:'5px', minWidth:'300px'}}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={releaseDate}
            style={{padding:'5px', marginTop:'5px', minWidth:'300px'}}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        {loading ? <Loading/> : <div>
          <div>
            <label>Select Authors</label>
          </div>
          <select
            style={{minWidth:'320px', padding:'2.6px'}}
            multiple
            value={selectedAuthors}
            onChange={(e) =>
              setSelectedAuthors(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            {authorsList.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>}

        {loading ? <Loading/> : <div>
          <div>
            <label>Select Categories</label>
          </div>
          
          <select
            style={{minWidth:'320px',padding:'2.6px'}}
            multiple
            value={selectedCategories}
            onChange={(e) =>
              setSelectedCategories(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            {categoriesList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>}

        <div style={{padding:'5px', marginLeft:'50px'}}>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setImages(e.target.files ? Array.from(e.target.files) : [])
            }
          />
        </div>

        <button style={{ marginTop: '10px', backgroundColor: 'orange', color:'white' }} onClick={handleSubmit}>Add new book</button>
      </div>

      <h2>Books List</h2>
      {loading ? (
      <Loading />
      ) : (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {booksList.map((book) => (
            <div key={book._id} style={{ padding: '10px', backgroundColor: 'lightyellow', textAlign: 'center', border: '1px solid #ddd' }}>
            <div style={{minHeight:'420px'}}>
            <img src={book.images[0]} alt="Book" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
            <h3>{book.name}</h3>
            <p>Release: {new Date(book.release).toLocaleDateString()}</p>
            <p>Authors: {book.authors.map((author) => author.name).join(' - ')}</p>
            <p>Categories: {book.categories.map((category) => category.name).join(' - ')}</p>
            </div>
            <button style={{ backgroundColor: 'blue', color: 'white' }}><Link style={{color:'white'}} to={"/books/"+book.slug}>Detail</Link></button>
            <button onClick={()=>{dltSubmit(book.slug)}} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Delete</button>
        </div>
          ))}
        </ul>
      )}
    </> : <CircularIndeterminate/>}
    </div>
  );
};

export default BookComponent;
