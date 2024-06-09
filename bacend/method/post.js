
// KEndi dosyamızdan helen verileri kullnamak için import ettik
const BodyParses= require ("../utils/BodyParses")

// unıq id için kullanılan kutuphane
const crypto = require("crypto")
// console.log(crypto)

// Dosya okumak için fs methodunu kulanıyoruz
const fs = require("fs")

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {

      // isteğin body ulas
      const body = await BodyParses(req);
      

      //eski içerik var kontrol et
      if(!body.title || !body.year || !body.rating || !body.genre || !body.genre.length>0 ){
        res.writeHead(404)
        res.end("Lütfen Zorunlu Alanları Doldurunuz !!!!")
        return;
      }

      // kaydelicek file ID eklenecek  CRYPTO methodu ile
      body.id=crypto.randomUUID();
      // console.log(body)

      // json dosyasında verileri json formatınd al
      let data = fs.readFileSync("./data/movies.json" , "utf-8");
      //string oldugu için json parse ediyoruz
      data = JSON.parse(data);
      console.log(data)
      // mevcut film uzerine ekleme
      data.movies.push(body)

      // json dosyasına guncelleme
      fs.writeFileSync("./data/movies.json",JSON.stringify(data))

      // client cevap gonderilecek


      return res.end(JSON.stringify(body));
    } catch (error) {
      return res.end("Hata olsutu");
    }
  }
};
