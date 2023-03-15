import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {
  handleClose = () => {
    this.props.toggleModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let book;

    if (!this.props.showUpdate) {
      book = {
        title: e.target.title.value,
        description: e.target.description.value,
        status: false,
        image_url: e.target.imageUrl.value
      };

      this.props.addBook(book);
    } else {

      let status = (this.props.updatedBook.status !== e.target.status.checked) ? e.target.status.checked : this.props.updatedBook.status;


      book = {
        title: e.target.title.value || this.props.updatedBook.title,
        description: e.target.description.value || this.props.updatedBook.description,
        status: status,
        image_url: e.target.imageUrl.value || this.props.updatedBook.image_url
      };

      book._id = this.props.updatedBook._id;
      book.__v = this.props.updatedBook.__v;

      this.props.updateBook(book);
    }

    this.handleClose();
  }

  render() {
    let bookStatus = !this.props.showUpdate ? "Add Book" : "Update Book";
    let updateExists = this.props.showUpdate;

    return (
      <Modal show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header>{bookStatus}</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title" >
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control type="text" placeholder={this.props.updatedBook.title}>

              </Form.Control>
            </Form.Group>
            <Form.Group controlId="description" >
              <Form.Label>
                Description
              </Form.Label>
              <Form.Control type="text" controlId="description" placeholder={updateExists ? this.props.updatedBook.description : ''}>

              </Form.Control>
            </Form.Group>
            <Form.Group controlId="imageUrl" >
              <Form.Label>
                Image URL
              </Form.Label>
              <Form.Control type="text" controlId="imageUrl" placeholder={updateExists ? this.props.updatedBook.image_url : ''}>

              </Form.Control>
            </Form.Group>

            {this.props.showUpdate
              &&
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="Checked Out" defaultChecked={this.props.updatedBook.status}>
                </Form.Check>
              </Form.Group>
            }

            <Button type="submit">{bookStatus}</Button>

            <Button onClick={this.handleClose}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default BookFormModal;