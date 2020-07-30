import React from 'react';
import './App.css';
import SearchBooks from './components/SearchBooks';
import BookShelf  from './components/BookShelf';
import { Route }  from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';


class BooksApp extends React.Component {
  
  state = {
    shelf_books: [],
    loading: true
  }

  /**
   * @description Fetching all the books from the server via api call getAll()
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          shelf_books: books,
          loading: false
        }))
    })
  }

  /**
   * @description It will be called whenever there is an update occur in book category.
   * @method
   * @param {object} selected_book - Selected Book Object
  */
  updateBooksCollection = (selected_book) => {
    BooksAPI.get(selected_book.id).then((_book) => {
        this.setState((currState) => ({
            shelf_books: currState.shelf_books.filter((book) => book.id !== _book.id).concat(_book),
            loading: false
        }))
    })
  }

  /**
   * @description Used for changing loading state used by loading component.
   * @method
   * @param {boolean} state - true/false
  */
  setLoadingState = (state) => {
    this.setState({loading: state})
  }

  render() {
    const { shelf_books, loading } = this.state
    return (
      <div className="app">
          <Route path='/search' render={() => (
            <SearchBooks 
              shelf_books={shelf_books}
              onBookShelfUpdate={this.updateBooksCollection}
              loading={loading}
              onLoading={this.setLoadingState} />
          )}/>
          
          <Route exact path="/" render={() => (
              <BookShelf 
                books={shelf_books} 
                loading={loading}
                onLoading={this.setLoadingState}
                onBookShelfUpdate={this.updateBooksCollection}/>
            )} 
          />
      </div>
    )}}

export default BooksApp
