using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MiniProject.API.Models;
using MiniProject.API.Repository.Models;
using MiniProject.API.Services.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MiniProject.API.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ILogger<BooksController> _logger;
        private readonly IBookService _bookService;

        public BooksController(ILogger<BooksController> logger, IBookService bookService)
        {
            _logger = logger;
            _bookService = bookService;
        }

        /// <summary>
        /// Get all books
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAll()
        {
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }

        /// <summary>
        /// Get book by id
        /// </summary>
        /// <param name="bookid"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpGet("{bookid}")]
        public async Task<ActionResult<Book>> GetBook(int bookid)
        {
            var book = await _bookService.GetBookById(bookid);
            if(book != null)
            {
                return Ok(book);
            }
            return NoContent();            
        }


        /// <summary>
        /// Edit book by id
        /// </summary>
        /// <param name="bookid"></param>
        /// <param name="book"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpPut("{bookid}")]
        public async Task<ActionResult<Book>> EditBook(int bookid, Book book)
        {
            var updatedBook = await _bookService.UpdateBook(bookid, book);
            if (updatedBook != null)
            {
                return Ok(updatedBook);
            }
            return NoContent();
        }


        /// <summary>
        /// Add new book
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            var newBook = await _bookService.AddBook(book);
            return Created(newBook.Id.ToString(), newBook);
        }


        /// <summary>
        /// Delete book by id
        /// </summary>
        /// <param name="bookid"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete("{bookid}")]
        public async Task<NoContentResult> DeleteBook(int bookid)
        {
            await _bookService.DeleteBook(bookid);
            return NoContent();
        }


        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost("{bookid}/cover-page")]
        public async Task<ActionResult<Status>> AddCoverImage(int bookid, IFormFile file)
        {
            await _bookService.UploadCoverPage(bookid, file);
            return Created(bookid.ToString(), new Status());
        }

    }
}
