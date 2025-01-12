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
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isPriceFilter, setIsPriceFilter] = useState(false);
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
        setIsPriceFilter(event.target.value === 'price');
    };

    const handleSearch = () => {
        let result = books;

        if (searchTerm !== '') {
            result = result.filter(book => book[filter].toString().toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (isPriceFilter) {
            result = result.filter(book => book.price >= minPrice && book.price <= maxPrice);
        }

        if (filter === 'year') {
            result = result.filter(book => book.year >= minYear && book.year <= maxYear);
        }

        if (filter === 'rating') {
            result = result.filter(book => book.rating >= minRating && book.rating <= maxRating);
        }

        setFilteredBooks(result);
    };

    return (
        <div className="home flex flex-col items-center justify-center h-256">
            <div className="search-container fixed ">                {isModalOpen && (
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
                <form className="join mt-8 w-5/6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <div className="w-full">
                        <div>
                            {isPriceFilter && (
                                <div>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Min Price"
                                           onChange={event => setMinPrice(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Max Price"
                                           onChange={event => setMaxPrice(event.target.value)}/>
                                </div>
                            )}
                            {filter === 'year' && (
                                <div>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Min Year"
                                           onChange={event => setMinYear(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Max Year"
                                           onChange={event => setMaxYear(event.target.value)}/>
                                </div>
                            )}
                            {filter === 'rating' && (
                                <div>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Min Rating"
                                           onChange={event => setMinRating(event.target.value)}/>
                                    <input type="number" className="input input-bordered join-item w-1/2"
                                           placeholder="Max Rating"
                                           onChange={event => setMaxRating(event.target.value)}/>
                                </div>
                            )}
                            {!isPriceFilter && filter !== 'year' && filter !== 'rating' && (
                                <input className="input input-bordered join-item w-full"
                                       placeholder="Search"
                                       onChange={handleSearchChange}/>
                            )}
                        </div>
                    </div>
                    <select className="select select-bordered join-item" value={selectedFilter}
                            onChange={handleFilterChange}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                        <option value="year">Year</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item select-bordered" onClick={handleSearch}>Search</button>
                    </div>
                </form>
            </div>
            <div className="container-with-book-cards w-full flex flex-wrap justify-start items-center align-stretch mb-8 p-8 overflow-y-auto mt-24">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;