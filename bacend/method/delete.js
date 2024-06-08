const fs = require('fs').promises;

module.exports = async (req, res) => {
  try {
    // Yapılan isteğin temel adresini aldık
    const baseURL = req.url.substring(0, req.url.lastIndexOf('/'));
    console.log(baseURL);

    // URL id değerini değişkene atamak
    const id = req.url.split('/')[3];
    console.log(id);

    if (baseURL === '/api/movies' && id) {
      // Bütün elemanları almak
      const data = await fs.readFile('./data/movies.json', 'utf-8');
      const movies = JSON.parse(data).movies;

      // id eleman var mı kontrolü
      const isFound = movies.find((i) => i.id === id);

      // id eleman yoksa hata yolla
      if (!isFound) {
        res.writeHead(404);
        return res.end('ID Geçersiz');
      }

      // id eleman varsa filmi kaldır
      const filtered = movies.filter((item) => item.id != id);

      // JSON yeni veriyi aktar
      await fs.writeFile(
        './data/movies.json',
        JSON.stringify({ movies: filtered })
      );

      // client cevap gönder
      res.writeHead(204, { 'Content-Type': 'application/json' });
      return res.end();
    } else {
      res.writeHead(404);
      return res.end('Yol Bulunamadı...');
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end('Sunucu Hatası');
  }
};
