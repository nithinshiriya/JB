using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MiniProject.API.Repository.Interface;
using MiniProject.API.Repository.Models;
using MiniProject.API.Services.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MiniProject.API.Services
{
    /// <summary>
    /// Book Service class. Provides all CRUD operation support.
    /// </summary>
    public class BookService : IBookService
    {
        private readonly ILogger<BookService> _logger;
        private readonly IBookRepository _bookRepository;

        public BookService(ILogger<BookService> logger, IBookRepository bookRepository)
        {
            _logger = logger;
            _bookRepository = bookRepository;
        }

        /// <summary>
        /// Get All books
        /// </summary>
        /// <returns></returns>
        public Task<List<Book>> GetAllBooks()
        {
            return _bookRepository.GetAllBooks();
        }


        /// <summary>
        /// Get Book by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Book> GetBookById(int id)
        {
            return _bookRepository.GetBook(id);
        }

        /// <summary>
        /// Get Base64 string formfile.
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        private string GetFileBase64(IFormFile file)
        {
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    return Convert.ToBase64String(fileBytes);
                }
            }
            return null;
        }

        /// <summary>
        /// Add new book to the books
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public Task<Book> AddBook(Book book)
        {
            var newBook = new Book()
            {
                ModifiedDate = DateTime.Now,
                PublicationDate = DateTime.Now,
                Title = book.Title,
                Author = book.Author,
            };
            return _bookRepository.AddBook(newBook);
        }


        /// <summary>
        /// Modify existing books
        /// </summary>
        /// <param name="id"></param>
        /// <param name="book"></param>
        /// <returns></returns>
        public async Task<Book> UpdateBook(int id, Book book)
        {
            var dbBook = await GetBookById(id);
            if (dbBook == null)
            {
                return null;
            }
            dbBook.Author = book.Author;
            dbBook.Title = book.Title;
            dbBook.ModifiedDate = DateTime.Now;
            var updatedBook = await _bookRepository.UpdateBook(dbBook);
            return updatedBook;
        }


        /// <summary>
        /// Delete book
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task DeleteBook(int id)
        {
            return _bookRepository.DeleteBook(id);
        }


        /// <summary>
        /// Update cover page image
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<bool> UploadCoverPage(int id, IFormFile file)
        {
            if (file != null)
            {
                var coverPage = GetFileBase64(file);
                var dbBook = await GetBookById(id);
                if (dbBook == null)
                {
                    return false;
                }

                dbBook.CoverImage = coverPage;
                dbBook.ModifiedDate = DateTime.Now;
                _ = await _bookRepository.UpdateBook(dbBook);
                return true;
            }
            return false;
        }
    }
}
