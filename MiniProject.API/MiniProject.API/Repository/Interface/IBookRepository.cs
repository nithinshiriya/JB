using MiniProject.API.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MiniProject.API.Repository.Interface
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooks();
        Task<Book> GetBook(int id);
        Task<Book> AddBook(Book book);
        Task<Book> UpdateBook(Book book);
        Task DeleteBook(int id);
    }
}
