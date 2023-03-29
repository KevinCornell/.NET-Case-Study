using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class FlashCardDTO
    {
        [Key]
        public Guid? id { get; set; }
        public string? question { get; set; }
        public string? answer { get; set; }
    }
}
