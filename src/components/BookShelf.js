import React from 'react';
import BookShelfCategory from './BookShelfCategory';
import SearchBookButton from './SearchBookButton';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const BookShelf = (props) =>  {

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: green;
        `;
 
    
    /**
     * @description Filter books on the bases of their shelf category and return a array of objects.
     * @param {array} books - Array of shelf books.
    */
    const filterCategories= (books) => {
        return [
            {
                name: "Currently Reading",
                books: books.filter(book => book.shelf.toLowerCase() === 'currentlyreading')
            },
            {
                name: "Wants To Read",
                books: books.filter(book => book.shelf.toLowerCase() === 'wanttoread')
            },
            {
                name: "Read",
                books: books.filter(book => book.shelf.toLowerCase() === 'read')
            }
        ]
    }

        const { books, loading, onLoading, onBookShelfUpdate }  = props
        const categories = filterCategories(books)

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div className="bookshelf">
                        { categories.map((category, index) => 
                            <div key={index}> 
                                <h2 className="bookshelf-title">{category.name}</h2>
                                <div className="bookshelf-books">
                                    <ClipLoader size={50} css={override} color={"#123abc"} loading={loading}/>
                                    <ol className="books-grid">
                                        {category.books.map((book) =>
                                            <BookShelfCategory 
                                                key={book.id} 
                                                book={book} 
                                                onBookShelfUpdate={onBookShelfUpdate}
                                                onLoading={onLoading} />
                                        )}
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <SearchBookButton />
            </div>
        )
}

export default BookShelf;