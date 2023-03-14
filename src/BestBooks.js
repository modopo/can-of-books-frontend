import React from 'react';
import axios from 'axios';
import Book from './Book';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import Alert from 'react-bootstrap/Alert';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      error: {}
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let result = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: result.data
      })
    } catch (err) {
      console.log(err.response.data);
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  addBook = async (input) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, input);
      console.log(createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data]
      });
    } catch(error) {
      console.log(error.response.data);
      this.setState({
        error: error
      });
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
        <Button onClick={this.toggleModal}>Add Book</Button>
        {this.state.showModal
          &&
          <BookFormModal 
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
            addBook={this.addBook}
          />
        }
        {
          Object.keys(this.state.error).length > 0
          &&
            <Alert variant="danger">
              Error: {this.state.error.response.data}
            </Alert>
        }
      </>
    )
  }
}

export default BestBooks;
