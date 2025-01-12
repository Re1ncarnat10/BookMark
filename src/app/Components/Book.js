import React from 'react';
const Book = ({  book }) => {

    return (
        <div key={book.id} className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
            <figure><img className="h-80" src={book.image} alt={book.title}/></figure>
            <div className="card-body color-primary bg-accent h-80">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text">{book.description}</p>
                <p className="card-text">{book.genre}</p>
                <p className="card-text">{book.year}</p>
                <p className="card-text"><strong>Rating:
                </strong>{book.rating || 'Not rated yet'}</p>
            </div>
        </div>
    );
};

export default Book;
// "title": "string",
//   "author": "string",
//   "genre": "string",
//   "year": 0,
//   "description": "string",
//   "rating": 0,