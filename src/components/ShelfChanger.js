import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ShelfChanger extends Component {
    
    state ={
        shelf: "none"
    }

    componentDidMount = () => {
        const current_shelf = this.props.currentShelf
        if (current_shelf) {
            this.setState(()=> ({
                shelf: current_shelf
            }))
        }
    }

    render() {
        const { currentBook, onShelfChange } = this.props
        const { shelf } = this.state

        /**
         * @description Call on change of book category and set the local shelf state.
         * @callBack
         * @param {object} selected_book - selected book object.
         * @param {string} selected_shelf - selected shelf option.
        */
        const onChange = (book, shelf) => {
            this.setState({shelf: shelf});
            onShelfChange(book, shelf);
        }
        
        return(
            <div className="book-shelf-changer">
                <select onChange={(event) => onChange(currentBook, event.target.value)} value={shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }   
}

ShelfChanger.propTypes = {
    onShelfChange: PropTypes.func,
    currentBook: PropTypes.object.isRequired,
    currentShelf: PropTypes.string
}

export default ShelfChanger