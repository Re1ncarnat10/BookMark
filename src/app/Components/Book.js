import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Book = ({ book, onGenreClick }) => {
    const router = useRouter();
    const [rating, setRating] = useState(book.rating || 0);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    let hoverTimeout;

    const handleCardClick = () => {
        router.push(`/BookEditor?id=${book.id}`);
    };

    const handleStarClick = (newRating) => {
        setRating(newRating);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 10; i++) {
            stars.push(
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                    onClick={() => handleStarClick(i)}
                    style={{ cursor: 'pointer' }}
                >
                    <path
                        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168L.466 9.21l8.2-1.192z"
                        fill={i <= rating ? 'gold' : 'gray'}
                    ></path>
                </svg>
            );
        }
        return stars;
    };

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            setIsDescriptionVisible(true);
        }, 5000);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setIsDescriptionVisible(false);
    };

    return (
        <div className="card  max-h-[688px]">
            <div className="image  " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {isDescriptionVisible ? (
                    <div className="description">
                        <p>{book.description}</p>
                    </div>
                ) : (
                    <img src={book.image} alt={book.title} className="image" />
                )}
            </div>
            <div className="title">
                {book.title}<br/><span className="author">by {book.author}</span></div>
            <div className="love">
                {renderStars(rating)}
                <span>{rating}/10</span>
            </div>
            <div className="category">
                {book.genre.split(',').map((genre, index) => (
                    <button key={index} className="button" onClick={() => onGenreClick(genre.trim())}>{genre.trim()}</button>
                ))}
                <button className="button">{book.year}</button>
            </div>
            <button className="action" onClick={handleCardClick}>Details</button>
        </div>
    );
};

export default Book;