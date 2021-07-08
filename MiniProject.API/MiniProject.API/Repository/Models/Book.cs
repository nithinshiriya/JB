using System;
using System.ComponentModel.DataAnnotations;

namespace MiniProject.API.Repository.Models
{
    public partial class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(100)]
        public string Author { get; set; }

        [Required]
        public DateTime PublicationDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public string CoverImage { get; set; }
    }
}
