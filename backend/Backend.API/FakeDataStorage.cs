using Backend.Core.Modell.Entities;
using Flurl.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Backend.API
{
    public static class FakeDataStorage
    {
        private static List<Versenyzo> _data = null;

        public static List<Versenyzo> Data
        {
            get
            {
                return _data == null ?
                       FetchData("./data.json") :
                       _data;
            }
        }

        public static void AddNewPalyer(Versenyzo player)
        {
            if (_data == null)
            {
                _data = FetchData("./data.json");
            }

            _data.Add(player);
        }

        public static async Task UpdatePalyer(Versenyzo player)
        {
            if (_data == null)
            {
                _data = FetchData("./data.json");
            }

            Versenyzo toUpdate = _data.Find(x => x.Rajtszam == player.Rajtszam);

            int index = _data.IndexOf(toUpdate);
            _data.RemoveAt(index);
            _data.Insert(index, player);
        }

        public static async Task DeletePalyer(int rajtaszam)
        {
            if (_data == null)
            {
                _data = FetchData("./data.json");
            }

            Versenyzo toDelete = _data.Find(x => x.Rajtszam == rajtaszam);
            int index = _data.IndexOf(toDelete);
            _data.RemoveAt(index);
        }

        private static async Task<List<Versenyzo>> FetchData()
        {
            string url = "";

            List<Versenyzo> players = await url.GetJsonAsync<List<Versenyzo>>();

            return players;
        }

        private static List<Versenyzo> FetchData(string filePath)
        {
            List<Versenyzo> players = null;

            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    string jsonString = r.ReadToEnd();
                    players = JsonConvert.DeserializeObject<List<Versenyzo>>(jsonString);
                }
            }

            return players;
        }

        public static void SaveData(string filePath = "./data.json")
        {
            using (FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                using (StreamWriter r = new StreamWriter(fs, Encoding.UTF8))
                {
                    string players = JsonConvert.SerializeObject(_data);
                    r.Write(players);
                }
            }

            _data = FetchData("./data.json");
        }

        public static int AlapRajtszam(string kategoria)
        {
            int rajtszam = 0;

            switch (kategoria)
            {
                case "SUP":
                    rajtszam = 100;
                    break;
                case "Kenu":
                    rajtszam = 2000;
                    break;
                case "Kajak":
                    rajtszam = 3000;
                    break;
                case "Sarkanyhajo_10":
                    rajtszam = 4000;
                    break;
                case "Sarkanyhajo_20":
                    rajtszam = 5000;
                    break;
                case "Vizibicikli_2":
                    rajtszam = 6000;
                    break;
                default:
                    throw new Exception("Nem letezo kategirara nem tudunk rajtszamot generalni.");
            }

            return rajtszam;
        }
    }
}
