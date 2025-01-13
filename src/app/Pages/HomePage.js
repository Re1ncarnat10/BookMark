"use client"
import React, { useEffect, useState } from 'react';
import { getBooks } from '../Components/api';
import BookCard from "../Components/Book";

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState('title');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('title');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);

    useEffect(() => {
        getBooks()
            .then(books => {
                setBooks(books);
                setFilteredBooks(books);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setFilter(event.target.value);
    };

    const handleSearch = () => {
        let result = books;

        if (searchTerm !== '') {
            result = result.filter(book => book[filter].toString().toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (filter === 'year') {
            result = result.filter(book => book.year >= minYear && book.year <= maxYear);
        }

        if (filter === 'rating') {
            result = result.filter(book => book.rating >= minRating && book.rating <= maxRating);
        }

        setFilteredBooks(result);
    };

    const handleGenreClick = (genre) => {
        setFilter('genre');
        setSearchTerm(genre);
        const result = books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
        setFilteredBooks(result);
    };

    return (
        <div className="home flex flex-col items-center justify-center ">
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-auto bg-transparent flex flex-col items-center px-4 grid-flow-col z-50">
                {isModalOpen && (
                    <dialog id="my_modal_1" className="modal" open>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Login successful. Welcome!</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )}
                <form className="join mt-8 w-full max-w-4xl mx-auto grid-flow-col" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <div className="w-full flex grid-flow-col">
                        <div className="flex-grow">
                            {filter === 'year' && (
                                <div className="flex flex-wrap">
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Min Year"
                                           onChange={event => setMinYear(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Max Year"
                                           onChange={event => setMaxYear(event.target.value)}/>
                                </div>
                            )}
                            {filter === 'rating' && (
                                <div className="flex flex-wrap">
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Min Rating"
                                           onChange={event => setMinRating(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Max Rating"
                                           onChange={event => setMaxRating(event.target.value)}/>
                                </div>
                            )}
                            {filter !== 'year' && filter !== 'rating' && (
                                <input className="input input-bordered join-item w-full"
                                       placeholder="Search"
                                       value={searchTerm}
                                       onChange={handleSearchChange}/>
                            )}
                        </div>
                        <select className="select select-bordered join-item w-full sm:w-auto" value={selectedFilter}
                                onChange={handleFilterChange}>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            <option value="genre">Genre</option>
                            <option value="year">Year</option>
                            <option value="rating">Rating</option>
                        </select>
                        <div className="indicator w-full sm:w-auto">
                            <button className="btn join-item select-bordered w-full sm:w-auto" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container-with-book-cards w-full flex flex-wrap justify-start items-center align-stretch pl-8 pr-8 overflow-y-auto mt-20 h-full">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} onGenreClick={handleGenreClick} />
                ))}
            </div>
        </div>
    );
};

export default Home;