using Microsoft.AspNetCore.Http;
using MiniProject.API.Models;
using MiniProject.API.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MiniProject.API.Services.Interface
{
    public interface IBookService
    {
        Task<List<Book>> GetAllBooks();
        Task<Book> GetBookById(int id);
        Task<Book> AddBook(Book book);
        Task<Book> UpdateBook(int id, Book book);
        Task DeleteBook(int id);
        Task<bool> UploadCoverPage(int id, IFormFile file);
    }
}
