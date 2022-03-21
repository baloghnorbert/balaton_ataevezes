namespace Backend.Core.Modell.Entities
{
    public class Kategoria
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public Kategoria()
        {
        }

        public Kategoria(string id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
