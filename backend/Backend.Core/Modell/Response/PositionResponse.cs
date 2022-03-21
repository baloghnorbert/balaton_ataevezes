namespace Backend.Core.Modell.Response
{
    public class PositionResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public PositionResponse()
        {
        }

        public PositionResponse(string id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
