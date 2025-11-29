const datos = require("./datos.json");

/*
  Para correr este archivo, utilicen el comando
  $ node parcial1.js
*/

// Punto 1
function puntoUno(estudiantes) {
  let contador = 0

  estudiantes.forEach(estudiante => {
    let sumaNotas = 0
    estudiante.cursos.forEach(curso => {
      sumaNotas = sumaNotas + curso.nota
    });

    let promedio = sumaNotas / estudiante.cursos.length
    if (promedio < 3.3) {
      contador++
    }
  })

  return contador
}


// Punto 2
function puntoDos(estudiantes) {
  let resultado = []
  if (Array.isArray(estudiantes)) {
    for (let i = 0; i < estudiantes.length; i++) {
      resultado.push(`${estudiantes[i].nombre} ${estudiantes[i].apellido}`)
    }
  } else {
    resultado.push(`${estudiantes.nombre} ${estudiantes.apellido}`)
  }
  return resultado
}

// Punto 3
function puntoTres(estudiantes) {
  const lista = Array.isArray(estudiantes) ? estudiantes : [estudiantes]
  lista.sort((a, b) => a.altura - b.altura)
  
  let ids = []
  for (let i = 0; i < lista.length; i++) {
    ids.push(lista[i]._id)
  }
  
  return ids
}

// Punto 4
function puntoCuatro(numeros) {
  return numeros.reduce((acc, num) => acc + num, 0) / numeros.length;
}

// Punto 5
function puntoCinco(palabra) {
  const strReversa = palabra.split('').reverse().join('')
  if (palabra === strReversa) {
    return true
  } else {
    return false
  }
}

// Punto 6
function puntoSeis(palabra) {
  return palabra.split("").reverse().join('')
}

// Punto 7
function puntoSiete(lista, campo) {
  return lista.sort((a, b) => a[campo] - b[campo])
}
