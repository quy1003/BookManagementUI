import axios from "axios";

export const endpoints = {
    "books": "/books/",
    "book": (slug:string) => `/books/${slug}`,
    "authors": "/authors/",
    "categories": "/categories/"
}


export default axios.create({
    baseURL: 'https://manager-book-1762a753fefb.herokuapp.com/'
})