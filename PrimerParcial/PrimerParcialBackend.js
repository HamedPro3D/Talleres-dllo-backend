const datos = require("./datos.json");


function puntoSiete(lista, campo) {
  return lista.sort((a, b) => a[campo] - b[campo])
}

 console.log(puntoSiete(datos))

