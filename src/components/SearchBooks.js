import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../api/BooksAPI'
import BookShelfCategory from './BookShelfCategory'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";


class SearchBooks extends Component {
    state = {
        searched_books: [],
    }

    override = css`
        display: block;
        margin: 0 auto;
        border-color: green;
        `;

    /**
     * @description It will be called whenever a user perform a search.
     * Search API call does not contain the information of current book shelf.
     * books returned in search results should be compared to books on shelf.
     * If a book exists on shelf, the shelf on which the book resides on can be highlighted on the dropdown.
     * @callback
     * @param {string} value - query value to search.
    */
    onChange = (value) => {
        BooksAPI.search(value)
            .then((results) => {
                if (results && !results.error) {
                    const shelf_books = this.props.shelf_books
                    results.map((el, outer_index) => { 
                        return shelf_books.map((f, inner_index) => {
                            if (results[outer_index].id === shelf_books[inner_index].id) {
                                results[outer_index].shelf = shelf_books[inner_index].shelf
                            }
                            return results[outer_index]
                        })
                    })
                }
                this.setState(() => ({
                    searched_books: results && !results.error ? results: results.items
                }))
            })
    }

    render() {
        const { searched_books } = this.state
        const { onBookShelfUpdate, loading, onLoading } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>  
                <div className="search-books-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by title or author" 
                        onChange={(event) => this.onChange(event.target.value)}/>

                </div>
                </div>
                <div className="search-books-results">
                <ClipLoader size={50} css={this.override} color={"#123abc"} loading={loading}/>
                <ol className="books-grid">
                    { searched_books.map((searched_book) =>
                        <BookShelfCategory 
                            key={searched_book.id} 
                            book={searched_book}
                            onBookShelfUpdate={onBookShelfUpdate}
                            onLoading={onLoading}/>
                    )}
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks