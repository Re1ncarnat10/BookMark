"use client";
import React, { useState, useEffect } from 'react';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../Components/api';

const BookEditor = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        getBooks()
            .then(setBooks)
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    useEffect(() => {
        if (selectedBookId) {
            getBookById(selectedBookId)
                .then(book => {
                    setTitle(book.title);
                    setAuthor(book.author);
                    setGenre(book.genre);
                    setYear(book.year);
                    setDescription(book.description);
                    setRating(book.rating);
                    setStatus(book.status);
                    setImage(book.image);
                })
                .catch(error => console.error('Error fetching book:', error));
        } else {
            resetForm();
        }
    }, [selectedBookId]);

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setDescription('');
        setRating('');
        setStatus('');
        setImage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { id: selectedBookId, title, author, genre, year, description, rating, status, image };
        const bookDataNew = { title, author, genre, year, description, rating, status, image };
        try {
            if (selectedBookId) {
                await updateBook(selectedBookId, bookData);
                console.log('Book updated successfully');
            } else {
                await addBook(bookDataNew);
                console.log('Book added successfully');
            }
            resetForm();
            setSelectedBookId('');
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                if (selectedBookId) {
                    await deleteBook(selectedBookId);
                    console.log('Book deleted successfully');
                    resetForm();
                    setSelectedBookId('');
                    setBooks(books.filter(book => book.id !== selectedBookId));
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Book Editor</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium">Select Book to Edit</label>
                <select
                    value={selectedBookId}
                    onChange={(e) => setSelectedBookId(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">New Book</option>
                    {books.map(book => (
                        <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                </select>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="btn btn-primary">Save</button>
                    {selectedBookId && (
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookEditor;