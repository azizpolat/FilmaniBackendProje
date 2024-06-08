module.exports = (request) => {
  return new Promise((resolve, reject) => {
    // fonssiyonu body tanımla
    let body = "";

    // fronted body her parcası glsiğine  al ve yukarı değişene ekle
    request.on("data",(chuck) => {
        body +=chuck
    });

    // yukleme bittiğinde json verisine cevirme
    request.on("end",() => {

        // fonsyonun cagrılıd yere bosy kısmını return et
        resolve(JSON.parse(body))
    })

  });
};
