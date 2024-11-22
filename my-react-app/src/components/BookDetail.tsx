import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api, { endpoints } from "../config/api";
import RecipeReviewCard from "./BookCard";

const BookDetail = () => {
    const [book, setBook] = useState({})
    const {slug} = useParams<{ slug?: string }>();
    useEffect(()=>{
        const loadBook = async() => {
            if(slug){
                try{
                    const res = await api.get(endpoints['book'](slug))
                    setBook(res.data.book)
                    console.info(res.data.book)
                }
                catch(ex:any){
                    console.error(ex.response.data.message)
                }
            }
        }
        loadBook()
    },[slug])
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'-30px'}}>
            <RecipeReviewCard props={book} />
        </div>
    )
}

export default BookDetail