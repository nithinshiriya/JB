using Microsoft.EntityFrameworkCore;
using MiniProject.API.Repository.Models;

namespace MiniProject.API.Repository
{
    /// <summary>
    /// Database repository context.
    /// </summary>
    public partial class RepositoryContext : DbContext
    {
        public RepositoryContext()
        {
        }
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Books table
        /// </summary>
        public virtual DbSet<Book> Books { get; set; }

    }
}
