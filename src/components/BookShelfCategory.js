import React from 'react'
import ShelfChanger from './ShelfChanger'
import * as BooksAPI from '../api/BooksAPI'
import PropTypes from 'prop-types';

const BookShelfCategory = (props) => {

        const { book, onBookShelfUpdate, onLoading } = props;        
        
        /**
         * @description Update the book shelf category using remote api call.
         * @callBack
         * @param {object} selected_book - selected book object.
         * @param {string} selected_shelf - selected shelf option.
        */
        const updateBookShelf = (selected_book, selected_shelf) => {
            if (onLoading) {
                onLoading(true)
            }
            BooksAPI.update(selected_book, selected_shelf).then((books) => {
                if (onBookShelfUpdate) {
                    onBookShelfUpdate(selected_book)
                }
            })
        }

        return(
            <li>
                <div className="book">
                    <div className="book-top">
<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  book.imageLinks !== undefined ? 'url(' + book.imageLinks.thumbnail + ')' : 'url("http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")' }}></div>
						<ShelfChanger 
                            onShelfChange={updateBookShelf} 
                            currentBook={book} 
                            currentShelf={book.shelf} />
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && <div className="book-authors">{book.authors.map((author) => author)}</div> }
                </div>
            </li>
        )
    }

BookShelfCategory.propTypes = {
    book: PropTypes.object.isRequired,
    onLoading: PropTypes.func,
    onBookShelfUpdate: PropTypes.func
}

export default BookShelfCategory