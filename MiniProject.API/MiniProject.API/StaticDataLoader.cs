using MiniProject.API.Repository;
using MiniProject.API.Repository.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace MiniProject.API
{
    public static class StaticDataLoader
    {

        public static void LoadData(RepositoryContext context, string rootpath)
        {
            var jsonString = File.ReadAllText("books.json");
            var books = JsonSerializer.Deserialize<List<Book>>(jsonString);
            foreach (var book in books)
            {
                book.ModifiedDate = DateTime.Now;
                book.PublicationDate = DateTime.Now;
                context.Books.Add(book);
            }
            context.SaveChanges();
        }
    }
}
