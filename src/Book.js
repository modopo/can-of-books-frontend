import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Book extends React.Component {
    render() {
        const books = this.props.bookData.map((book) => {
            return (
            <Carousel.Item key={book._id}>
                <img style={{ height: '500px' }}className="d-block mx-auto"
                    src={book.image_url}
                    alt={book.title}
                />
                <Carousel.Caption style={{ color:'white' }}>
                    <h4>{book.title}</h4>
                    <p style={{fontSize: "12px"}}>{book.description}</p>
                    <p style={{fontSize: "10px"}}>Checked out: {book.status ? 'Yes' : 'No'}</p>
                </Carousel.Caption>
            </Carousel.Item>
            );
        });

        return (
            <Carousel style={{backgroundColor: "black"}}>
                {books}
            </Carousel>
        );
    }
}

export default Book;