 // frontend'den bir post/put/patch/delete isteği atılığı zaman tarayıcı öncelikle server'ın bu istek tiplerini kabul ettiğini kontrol etmek amacıyla options methoduyla istek atıyor. Eğer options isteği gelince cevap göndermezssek diğer isteği hiç atmıyor ama option gelince doğru header'lar ile cevap verirsek options'ın ardından asıl isteği gönderiyor

// server olusturma için http kodu olustur
const http = require("http");

const getRequest = require("./method/get");
const postRequest = require("./method/post");
const deleteRequest = require("./method/delete");
const url = require("url");

//1- server olusutr
const server = http.createServer((req, res) => {
  //Frontede gonderilecek butun vevaplar eklenece ve  Cors hatasını
  // gidermek için eklnenecek header
  res.setHeader("Access-Control-Allow-Origin","*")

  console.log(req.method);

  // yapılan isteğin temel adrsi
  req.url.substring(0, req.url.lastIndexOf("/"));

  const id = req.url.split("/")[3];
 

  // METHOFLARI BASKA BIR KLAORE OLUSTURUP YUKARDA İMPORT EDEREK KULLANILDI
  switch (req.method) {

    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS")
      res.end();
      break;

    case "GET":
      getRequest(req, res);
      break;

    case "POST":
      postRequest(req, res);
      break;
      
    case "DELETE":
      deleteRequest(req, res);
      break;

    default:
      // CEVABIN KODUNU BELİRLEDİK
       res.statusCode = 404;

      // GÖNDERİLECEK CEVAB İÇİERİGİNİN TİPİNİ HEADER EKLEME VE TYPE BOYLELİKLE JSON CEVİRDİK
      res.setHeader("Content-Type", "application/json");

      // Tanımlı olmayan İstek Durumunda GÖnderilen Mesaj
      res.write(
        JSON.stringify({
          message: "İSTEK Yapılan Adres Tanımsız",
        })
      );
      // cliente cevabı gönderme
      res.end();

  }
});



// belirli porta giden  istekleri dinlemek için 
const port = 5005;

server.listen(port, () => {
  console.log(`server ${port} istekler Dinlemeye başladı`);
});
