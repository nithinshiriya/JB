using MiniProject.API.Repository.Interface;
using MiniProject.API.Repository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniProject.API.Repository
{
    /// <summary>
    /// Books repository. Provide all type of crud operation on table.
    /// </summary>
    public class BookRepository : IBookRepository
    {
        private RepositoryContext _context;
        public BookRepository(RepositoryContext repositoryContext)
        {
            _context = repositoryContext;
        }

        /// <summary>
        /// Get all books from Books table
        /// </summary>
        /// <returns></returns>
        public Task<List<Book>> GetAllBooks()
        {
            return Task.Run(() =>
             {
                 return _context.Books.Select(p => new Book
                 {
                     Id = p.Id,
                     Author = p.Author,
                     Title = p.Title,
                     PublicationDate = p.PublicationDate
                 }).ToList();
             });
        }


        /// <summary>
        /// Get Book by id from the books table.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Book> GetBook(int id)
        {
            return Task.Run(() =>
            {
                return _context.Books.FirstOrDefault(p => p.Id == id);
            });
        }


        /// <summary>
        /// Add book to the books table.
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public async Task<Book> AddBook(Book book)
        {
            var newBook = await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return newBook.Entity;
        }


        /// <summary>
        /// Modify or update existing book to books table.
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public async Task<Book> UpdateBook(Book book)
        {
            var newBook = _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return newBook.Entity;
        }


        /// <summary>
        /// Delete book from the books table.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(p => p.Id == id);
            if (book != null)
            {
                _context.Books.Remove(book);
            }
            await _context.SaveChangesAsync();
        }

    }
}
