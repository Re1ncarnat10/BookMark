using Microsoft.AspNetCore.Mvc;
using BookMark.Models;
using BookMark.Data;
using Microsoft.EntityFrameworkCore;

namespace BookMark.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly MyDbContext _context;

    public BooksController(MyDbContext context)
    {
        _context = context;
    }

    // 1. GET: api/books - Pobierz wszystkie książki
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        return await _context.Books.ToListAsync();
    }

    // 2. GET: api/books/{id} - Pobierz książkę po ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return book;
    }

    // 3. POST: api/books - Dodaj nową książkę
    [HttpPost]
    public async Task<ActionResult<Book>> PostBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // 4. PUT: api/books/{id} - Zaktualizuj książkę
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        _context.Entry(book).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Books.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // 5. DELETE: api/books/{id} - Usuń książkę
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // 6. POST: api/books/copy/{id} - Skopiuj książkę
    [HttpPost("copy/{id}")]
    public async Task<ActionResult<Book>> CopyBook(int id)
    {
        var originalBook = await _context.Books.FindAsync(id);

        if (originalBook == null)
        {
            return NotFound();
        }

        var copiedBook = new Book
        {
            Title = originalBook.Title + " (Copy)",
            Author = originalBook.Author,
            Genre = originalBook.Genre,
            Year = originalBook.Year,
            Description = originalBook.Description,
            Rating = originalBook.Rating,
            Status = originalBook.Status,
            Image = originalBook.Image
        };

        _context.Books.Add(copiedBook);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = copiedBook.Id }, copiedBook);
    }
}
