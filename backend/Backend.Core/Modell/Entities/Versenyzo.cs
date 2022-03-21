using Backend.Core.Modell.Enum;
using Backend.Core.Modell.Request;
using System;
using System.Text.Json.Serialization;

namespace Backend.Core.Modell.Entities
{
    public class Versenyzo : VersenyzoRequest
    {
        [JsonIgnore]
        public int Id{ get; set; }
        public int Rajtszam { get; set; }

        public Versenyzo()
        {
        }

        public Versenyzo(VersenyzoRequest versenyzo, int id, int rajtszam)
        {
            Id = id;
            Rajtszam = rajtszam;
            Nev = versenyzo.Nev;
            SzuletesiEv = versenyzo.SzuletesiEv;
            Iranyzitoszam = versenyzo.Iranyzitoszam;
            Telepules = versenyzo.Telepules;
            Lakcim = versenyzo.Lakcim;
            Kategoria = versenyzo.Kategoria;
        }
    }
}
