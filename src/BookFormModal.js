import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {
    handleClose= () => {
        this.props.toggleModal();
    }

    handleSubmit= (e) => {
        e.preventDefault();
        let book = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: false,
            image_url: e.target.imageUrl.value
        };
        this.handleClose();
        this.props.addBook(book);
    }

    render() {
        return(
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header>Add Book</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control type="text">

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control type="text" controlId="description">
                                
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="imageUrl">
                            <Form.Label>
                                Image URL
                            </Form.Label>
                            <Form.Control type="text" controlId="imageUrl">
                                
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit">Add Book</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BookFormModal;