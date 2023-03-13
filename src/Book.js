import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Book extends React.Component {
    render() {
        return (
            <Carousel.Item>
                <img 
                    src={this.props.bookData.image_url}
                    alt={this.props.bookData.title}
                />
                <Carousel.Caption>
                    <h3>{this.props.bookData.title}</h3>
                    <p>{this.props.bookData.description}</p>
                    <p>Checked out: {this.props.bookData.status ? 'Yes' : 'No'}</p>
                </Carousel.Caption>
            </Carousel.Item>
        );
    }
}

export default Book;