const API_URL = 'http://localhost:5035/api';


export async function getBooks() {
    const response = await fetch(`${API_URL}/Books`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const books = await response.json();
    return books;
}
export async function getBookById(id) {
    const response = await fetch(`${API_URL}/Books/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const book = await response.json();
    return book;
}
export async function addBook(bookData) {
    const response = await fetch(`${API_URL}/Books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newBook = await response.json();
    return newBook;
}
export async function updateBook(id, bookData) {
    const response = await fetch(`${API_URL}/Books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(bookData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}
export async function deleteBook(id) {
    const response = await fetch(`${API_URL}/Books/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}
export async function copyBook(id) {
    const response = await fetch(`${API_URL}/Books/copy/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const copiedBook = await response.json();
    return copiedBook;
}