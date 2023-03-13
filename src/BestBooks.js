import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Book from './Book';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      console.log(process.env.REACT_APP_SERVER);
      let result = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: result.data
      })

      console.log(this.state);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Book 
            bookData={this.state.books}
          />
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
