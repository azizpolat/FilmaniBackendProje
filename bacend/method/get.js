// DATA JSON DOSYASINA OKUMAK
const fs = require("fs");

/*
eğerki client gelen istek
"api/movies" ise tum filmeleri
"api/movies/id ise sadece id li film gönder"
    
*/

module.exports = async (req, res) => {
  //console.log(req.url);

  // YAPILAN İSTEGĞİN TEMEL ADRESİNİ ALDIK
  const baseURL = req.url.substring(0, req.url.lastIndexOf("/"));
  console.log(baseURL);

  // URL ıd değerını değişkene atamak
  const id = req.url.split("/")[3];
  console.log(id);

  if (req.url === "/api/movies") {
    //1-  durum kodunu beliremek
    res.statusCode = 200;

    //2- headerleri belirlemek
    res.setHeader("Content-Type", "application/json");

    //3-json dosyasından Tüm Filmleri Almak
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    // 4- client Cevap Gönder
    return res.end(movies);

    // return res.end("Bütün Filmler") Movie gönderince bu bilgiye gerek kalmadı
  } else if (baseURL === "/api/movies" && id) {
    // 1 Bütün filmeleri JS formatında almak
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    //console.log(movies);

    //2- url İD göre eklenene Filmi Bulmak
    const bulunanMovie = data.movies.find((movie) => movie.id === id);
    console.log(bulunanMovie);

    if(bulunanMovie){
         // 3- Eğer filmi Bulunursa Cliente Gönder
        res.writeHead(200,{"Content-Type" : "application/json"})
        res.end(JSON.stringify(bulunanMovie))
    }else {
         // 4- Film Bulamaz ise HATA Gönder

    }
   
  

    // return res.end("Sadece Bir film"); GET İLE FİLMİ ALDIGIMIZ İÇİN BİLGİYE GEREK KALMADI
  } else {
    return res.end("Yol Bulunamadi");
  }

//   return res.end("GET istedğinden Gönderilen İstek");  GET İLE FİLMİ ALDIGIMIZ İÇİN BİLGİYE GEREK KALMADI
};

