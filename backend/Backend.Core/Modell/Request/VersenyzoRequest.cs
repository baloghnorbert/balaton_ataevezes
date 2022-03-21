using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Modell.Request
{
    public class VersenyzoRequest
    {
        [Required]
        public string Nev { get; set; }
        [Required]
        public DateTime SzuletesiEv { get; set; }
        [Required]
        public string Iranyzitoszam { get; set; }
        [Required]
        public string Telepules { get; set; }
        [Required]
        public string Lakcim { get; set; }
        [Required]
        public string Kategoria { get; set; }
    }
}
