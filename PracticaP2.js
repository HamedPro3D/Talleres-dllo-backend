// ------------------------------
// PRIMER BLOQUE (ejercicios 1 - 6)
const fs1 = require("fs");
const estudiantes1 = JSON.parse(fs1.readFileSync("15-datos-parcial-01.json", "utf-8"));

// 1. Retornar los nombres de los cursos de un estudiante
function nombresCursos(estudiante) {
  return estudiante.cursos.map(curso => curso.nombre);
}

// 2. Retornar la nota máxima de un estudiante
function notaMaxima(estudiante) {
  return Math.max(...estudiante.cursos.map(curso => curso.nota));
}

// 3. Retornar si un estudiante mide más de 1.65m
function esMayor165(estudiante) {
  return estudiante.altura > 1.65;
}

// 4. Retornar el nombre completo de un estudiante
function nombreCompleto(estudiante) {
  return `${estudiante.nombre} ${estudiante.apellido}`;
}

// 5. Retornar la diferencia de altura entre dos estudiantes
function diferenciaAltura(est1, est2) {
  return Math.abs(est1.altura - est2.altura);
}

// 6. Agregar el campo 'nombreCompleto' a un estudiante
function agregarNombreCompleto(estudiante) {
  return {
    ...estudiante,
    nombreCompleto: nombreCompleto(estudiante)
  };
}

// Ejemplos
const estA = estudiantes1[0]; // Alison Gonzalez
const estB = estudiantes1[1]; // Luis Fernandez

console.log("1. Cursos de Alison:", nombresCursos(estA));
console.log("2. Nota máxima de Alison:", notaMaxima(estA));
console.log("3. ¿Alison mide más de 1.65m?", esMayor165(estA));
console.log("4. Nombre completo de Alison:", nombreCompleto(estA));
console.log("5. Diferencia de altura Alison - Luis:", diferenciaAltura(estA, estB));
console.log("6. Estudiante con nombreCompleto:", agregarNombreCompleto(estA));


// ------------------------------
// SEGUNDO BLOQUE (ejercicios 7 - 20)
const fs2 = require("fs");
const estudiantes2 = JSON.parse(fs2.readFileSync("15-datos-parcial-01.json", "utf-8"));

// 7. Promedio de las notas de un estudiante
function promedioNotas(estudiante) {
  const notas = estudiante.cursos.map(c => c.nota);
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}

// 8. Curso con la peor nota
function peorCurso(estudiante) {
  return estudiante.cursos.reduce((min, c) => c.nota < min.nota ? c : min).nombre;
}

// 9. Contar estudiantes con altura < 1.6m
function contarBajos(lista) {
  return lista.filter(e => e.altura < 1.6).length;
}

// 10. Lista de nombres completos
function listaNombresCompletos(lista) {
  return lista.map(e => `${e.nombre} ${e.apellido}`);
}

// 11. Estudiantes que tomaron un curso
function estudiantesEnCurso(lista, cursoNombre) {
  return lista.filter(e => e.cursos.some(c => c.nombre === cursoNombre));
}

// 12. Nota más alta en un curso entre todos
function notaMaximaCurso(lista, cursoNombre) {
  let max = -Infinity;
  for (let e of lista) {
    for (let c of e.cursos) {
      if (c.nombre === cursoNombre && c.nota > max) max = c.nota;
    }
  }
  return max;
}

// 13. Estudiantes por apellido
function estudiantesPorApellido(lista, apellido) {
  return lista.filter(e => e.apellido === apellido);
}

// 14. Estudiante más alto
function estudianteMasAlto(lista) {
  return lista.reduce((max, e) => e.altura > max.altura ? e : max);
}

// 15. Estudiante con mejor promedio
function mejorPromedio(lista) {
  return lista.reduce((best, e) => promedioNotas(e) > promedioNotas(best) ? e : best);
}

// 16. Cursos repetidos de un estudiante
function cursosRepetidos(estudiante) {
  const conteo = {};
  for (let c of estudiante.cursos) {
    conteo[c.nombre] = (conteo[c.nombre] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(conteo).filter(([curso, cant]) => cant > 1));
}

// 17. Comparar promedio de dos estudiantes
function compararPromedios(est1, est2) {
  const p1 = promedioNotas(est1);
  const p2 = promedioNotas(est2);
  if (p1 > p2) return `${est1.nombre} ${est1.apellido} tiene mejor promedio`;
  if (p2 > p1) return `${est2.nombre} ${est2.apellido} tiene mejor promedio`;
  return "Ambos tienen el mismo promedio";
}

// 18. Cantidad de estudiantes por altura
function contarPorAltura(lista) {
  const conteo = {};
  for (let e of lista) {
    conteo[e.altura] = (conteo[e.altura] || 0) + 1;
  }
  return conteo;
}

// 19. Ranking top 5 promedios
function rankingTop5(lista) {
  return lista
    .map(e => ({ estudiante: `${e.nombre} ${e.apellido}`, promedio: promedioNotas(e) }))
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 5);
}

// 20. Estudiantes con alguna nota > 6
function notasMayoresA6(lista) {
  return lista.filter(e => e.cursos.some(c => c.nota > 6));
}

// Ejemplos
const estC = estudiantes2[0]; // Alison Gonzalez
const estD = estudiantes2[1]; // Luis Fernandez

console.log("7. Promedio Alison:", promedioNotas(estC));
console.log("8. Peor curso Alison:", peorCurso(estC));
console.log("9. Estudiantes < 1.6m:", contarBajos(estudiantes2));
console.log("10. Lista nombres:", listaNombresCompletos(estudiantes2).slice(0,5));
console.log("11. Estudiantes en Química I:", estudiantesEnCurso(estudiantes2, "Química I").length);
console.log("12. Nota máxima en Matemáticas III:", notaMaximaCurso(estudiantes2, "Matemáticas III"));
console.log("13. Apellido Martinez:", estudiantesPorApellido(estudiantes2, "Martinez").length);
console.log("14. Más alto:", estudianteMasAlto(estudiantes2));
console.log("15. Mejor promedio:", mejorPromedio(estudiantes2));
console.log("16. Cursos repetidos Alison:", cursosRepetidos(estC));
console.log("17. Comparar Alison vs Luis:", compararPromedios(estC, estD));
console.log("18. Conteo por altura:", contarPorAltura(estudiantes2));
console.log("19. Top 5 promedios:", rankingTop5(estudiantes2));
console.log("20. Con notas > 6:", notasMayoresA6(estudiantes2).length);
