"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addBook, getBooks, getBookById, updateBook, deleteBook, copyBook } from '../Components/api';
import FormControl from '../Components/FormControl';

const BookEditor = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(id || '');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        getBooks()
            .then(setBooks)
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    useEffect(() => {
        if (id) {
            setSelectedBookId(id);
        }
    }, [id]);

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
                    setIsEditable(false); // Ensure form is not editable when a book is selected
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
        setIsEditable(false);
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
            const updatedBooks = await getBooks();
            setBooks(updatedBooks);
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
                    const updatedBooks = await getBooks();
                    setBooks(updatedBooks);
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleCopy = async () => {
        try {
            if (selectedBookId) {
                await copyBook(selectedBookId);
                console.log('Book copied successfully');
                const updatedBooks = await getBooks();
                setBooks(updatedBooks);
            }
        } catch (error) {
            console.error('Error copying book:', error);
        }
    };

    return (
        <div className="h-screen bg-base-300">
            <div className="container mx-auto p-4 ">
                <h1 className="text-2xl font-bold mb-4">Book Details</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap w-full space-x-4">
                        <div className="flex-1 flex flex-col items-center w-full">
                            <label className="block text-sm font-medium mb-2"
                                   style={{fontFamily: 'Arial', fontWeight: 'bold'}}>Current Image</label>
                            <div className="bg-purple-300 h-full object-contain flex justify-center items-center mb-4">
                                <img alt="Book"
                                     className="h-full border-4 border-gray-300"
                                     src={image || "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png"}
                                />
                            </div>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="input input-bordered w-full"
                                required
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="flex-1 space-y-4">
                            <FormControl
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={!isEditable}
                            />
                            <FormControl
                                label="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                disabled={!isEditable}
                            />
                            <FormControl
                                label="Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                                disabled={!isEditable}
                            />
                            <FormControl
                                label="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                type="number"
                                required
                                disabled={!isEditable}
                            />
                            <FormControl
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                disabled={!isEditable}
                            />
                            <FormControl
                                label="Rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                type="number"
                                required
                                disabled={!isEditable}
                                max="10"
                            />
                            <FormControl
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="flex flex-col space-y-2 flex-shrink-0 items-center">
                            <button type="button" className="btn btn-secondary" onClick={handleCopy}>Copy</button>
                            <button type="submit" className="btn btn-primary" disabled={!isEditable}>Save</button>
                            {selectedBookId && (
                                <>
                                    <button type="button" className="btn btn-warning" onClick={() => setIsEditable(true)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookEditor;