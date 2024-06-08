import BodyParses from "../utils/BodyParses";

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // isteğin body ulas
    const body = await BodyParses(req);
    

      //eskij içerik var kontrol et

      // kaydelicek file id eklennce

      // json dosyasında verileri json formatınd al

      // mevcut film uzeirne ekleme

      // json dosyasına guncelle

      // clien cevao gonder

      return res.end("Film Olsutruldu");
    } catch (error) {
      return res.end("Hata olsutu");
    }
  }
};
