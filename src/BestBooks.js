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
      error: {},
      showUpdate: false,
      updatedBook: {}
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  setUpdate = (book) => {
    this.setState({
      showUpdate: true,
      updatedBook: book,
    })
  }

  resetUpdate = () => {
    this.setState({
      showUpdate: false,
      updatedBook: {}
    })
  }

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

  addBook = async (input) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, input);

      this.setState({
        books: [...this.state.books, createdBook.data],
        showUpdate: false
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        error: error
      });
    }
  }

  deleteBook = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log(error.response.data);
    }
  }

  updateBook = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedFromDB = await axios.put(url, bookToUpdate);
      
      let updatedBooks = this.state.books.map(book => {
        if (book._id === updatedFromDB.data._id) {
          this.setState({
            updatedBook: updatedFromDB.data,
          })
          return updatedFromDB.data;
        } else {
          return book;
        }
      });

      this.setState({
        books: updatedBooks
      });

    } catch (error) {
      console.log(error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Book
            bookData={this.state.books}
            deleteBook={this.deleteBook}
            toggleModal={this.toggleModal}
            setUpdate={this.setUpdate}
          />
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button onClick={() => { this.toggleModal(); this.resetUpdate(); }}>Add Book</Button>
        {this.state.showModal
          &&
          <BookFormModal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
            addBook={this.addBook}
            updatedBook={this.state.updatedBook}
            updateBook={this.updateBook}
            showUpdate={this.state.showUpdate}
            updatedBookID={this.state.updatedBookID}
            listOf
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
