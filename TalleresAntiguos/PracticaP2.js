// ----------------------------------
// Cargar datos (Node.js con fs)
const fs = require("fs");
const estudiantes = JSON.parse(fs.readFileSync("15-datos-parcial-01.json", "utf-8"));

/* 
1. Desarrolle una función que reciba un estudiante y retorne los nombres de los cursos del estudiante.
*/
function nombresCursos(estudiante) {
  return estudiante.cursos.map(curso => curso.nombre);
}

/* 
2. Desarrolle una función que reciba un estudiante y retorne la nota máxima lograda por el estudiante.
*/
function notaMaxima(estudiante) {
  return Math.max(...estudiante.cursos.map(curso => curso.nota));
}

/* 
3. Desarrolle una función que reciba un estudiante y retorne si el estudiante mide más de 1,65m.
*/
function esMayor165(estudiante) {
  return estudiante.altura > 1.65;
}

/* 
4. Desarrolle una función que reciba un estudiante y retorne el nombre completo del estudiante.
*/
function nombreCompleto(estudiante) {
  return `${estudiante.nombre} ${estudiante.apellido}`;
}

/* 
5. Desarrolle una función que reciba dos estudiantes y retorne la diferencia de altura entre los estudiantes.
*/
function diferenciaAltura(est1, est2) {
  return Math.abs(est1.altura - est2.altura);
}

/* 
6. Desarrolle una función que reciba un estudiante y retorne el estudiante con el campo 'nombreCompleto' agregado.
*/
function agregarNombreCompleto(estudiante) {
  return {
    ...estudiante,
    nombreCompleto: nombreCompleto(estudiante)
  };
}

/* 
7. Desarrolle una función que reciba un estudiante y retorne el promedio de las notas de sus cursos.
*/
function promedioNotas(estudiante) {
  const notas = estudiante.cursos.map(c => c.nota);
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}

/* 
8. Desarrolle una función que reciba un estudiante y retorne el nombre del curso donde obtuvo la peor nota.
*/
function peorCurso(estudiante) {
  return estudiante.cursos.reduce((min, c) => c.nota < min.nota ? c : min).nombre;
}

/* 
9. Desarrolle una función que reciba la lista de estudiantes y retorne cuántos estudiantes miden menos de 1.6m.
*/
function contarBajos(lista) {
  return lista.filter(e => e.altura < 1.6).length;
}

/* 
10. Desarrolle una función que reciba la lista de estudiantes y retorne un arreglo con todos los nombres completos.
*/
function listaNombresCompletos(lista) {
  return lista.map(e => `${e.nombre} ${e.apellido}`);
}

/* 
11. Desarrolle una función que reciba un curso (ej. "Matemáticas III") y retorne todos los estudiantes que lo han tomado.
*/
function estudiantesEnCurso(lista, cursoNombre) {
  return lista.filter(e => e.cursos.some(c => c.nombre === cursoNombre));
}

/* 
12. Desarrolle una función que reciba un curso y retorne la nota más alta lograda en ese curso entre todos los estudiantes.
*/
function notaMaximaCurso(lista, cursoNombre) {
  let max = -Infinity;
  for (let e of lista) {
    for (let c of e.cursos) {
      if (c.nombre === cursoNombre && c.nota > max) max = c.nota;
    }
  }
  return max;
}

/* 
13. Desarrolle una función que reciba un apellido y retorne la lista de estudiantes que lo comparten.
*/
function estudiantesPorApellido(lista, apellido) {
  return lista.filter(e => e.apellido === apellido);
}

/* 
14. Desarrolle una función que reciba la lista de estudiantes y retorne el estudiante más alto.
*/
function estudianteMasAlto(lista) {
  return lista.reduce((max, e) => e.altura > max.altura ? e : max);
}

/* 
15. Desarrolle una función que reciba la lista de estudiantes y retorne el estudiante con el promedio más alto de notas.
*/
function mejorPromedio(lista) {
  return lista.reduce((best, e) => promedioNotas(e) > promedioNotas(best) ? e : best);
}

/* 
16. Desarrolle una función que reciba un estudiante y retorne cuántas veces aparece un mismo curso repetido en su lista.
*/
function cursosRepetidos(estudiante) {
  const conteo = {};
  for (let c of estudiante.cursos) {
    conteo[c.nombre] = (conteo[c.nombre] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(conteo).filter(([curso, cant]) => cant > 1));
}

/* 
17. Desarrolle una función que reciba dos estudiantes y compare quién tiene mayor promedio de notas.
*/
function compararPromedios(est1, est2) {
  const p1 = promedioNotas(est1);
  const p2 = promedioNotas(est2);
  if (p1 > p2) return `${est1.nombre} ${est1.apellido} tiene mejor promedio`;
  if (p2 > p1) return `${est2.nombre} ${est2.apellido} tiene mejor promedio`;
  return "Ambos tienen el mismo promedio";
}

/* 
18. Desarrolle una función que reciba la lista de estudiantes y retorne un objeto con la cantidad de estudiantes por cada altura.
*/
function contarPorAltura(lista) {
  const conteo = {};
  for (let e of lista) {
    conteo[e.altura] = (conteo[e.altura] || 0) + 1;
  }
  return conteo;
}

/* 
19. Desarrolle una función que reciba la lista de estudiantes y retorne un ranking (orden descendente) de los 5 con mejor promedio.
*/
function rankingTop5(lista) {
  return lista
    .map(e => ({ estudiante: `${e.nombre} ${e.apellido}`, promedio: promedioNotas(e) }))
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 5);
}

/* 
20. Desarrolle una función que reciba la lista de estudiantes y retorne todos los que tengan alguna nota mayor a 6.
*/
function notasMayoresA6(lista) {
  return lista.filter(e => e.cursos.some(c => c.nota > 6));
}

// ------------------------------
// EJEMPLOS
const e1 = estudiantes[0]; // Alison Gonzalez
const e2 = estudiantes[1]; // Luis Fernandez

console.log("1. Cursos de Alison:", nombresCursos(e1));
console.log("2. Nota máxima de Alison:", notaMaxima(e1));
console.log("3. ¿Alison mide más de 1.65m?", esMayor165(e1));
console.log("4. Nombre completo de Alison:", nombreCompleto(e1));
console.log("5. Diferencia de altura Alison - Luis:", diferenciaAltura(e1, e2));
console.log("6. Estudiante con nombreCompleto:", agregarNombreCompleto(e1));
console.log("7. Promedio Alison:", promedioNotas(e1));
console.log("8. Peor curso Alison:", peorCurso(e1));
console.log("9. Estudiantes < 1.6m:", contarBajos(estudiantes));
console.log("10. Lista nombres (primeros 5):", listaNombresCompletos(estudiantes).slice(0, 5));
console.log("11. Estudiantes en Química I:", estudiantesEnCurso(estudiantes, "Química I").length);
console.log("12. Nota máxima en Matemáticas III:", notaMaximaCurso(estudiantes, "Matemáticas III"));
console.log("13. Apellido Martinez:", estudiantesPorApellido(estudiantes, "Martinez").length);
console.log("14. Más alto:", estudianteMasAlto(estudiantes));
console.log("15. Mejor promedio:", mejorPromedio(estudiantes));
console.log("16. Cursos repetidos Alison:", cursosRepetidos(e1));
console.log("17. Comparar Alison vs Luis:", compararPromedios(e1, e2));
console.log("18. Conteo por altura:", contarPorAltura(estudiantes));
console.log("19. Top 5 promedios:", rankingTop5(estudiantes));
console.log("20. Con notas > 6:", notasMayoresA6(estudiantes).length);
