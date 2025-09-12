/*******************************************************
 *  APUNTES JAVASCRIPT AVANZADO I & II
 *  Autor: [Tu Nombre]
 *  Descripción:
 *  Ejemplos + comentarios claros, estilo noobie, para
 *  entender funciones modernas de JavaScript.
 *******************************************************/

/* =====================================================
   1. OPTIONAL CHAINING (?.)
   ===================================================== */
// Sirve para acceder a propiedades que podrían no existir
// sin que el programa explote con un error.

function saludos(user) {
    console.log("Hola " + user?.name);
  }
  
  let user1 = { name: "El chanclas" };
  let user2 = {}; // vacío
  let user3;      // undefined
  
  saludos(user1); // Hola El chanclas
  saludos(user2); // Hola undefined
  saludos(user3); // Hola undefined
  
  
  /* =====================================================
     2. PARÁMETROS PREDETERMINADOS
     ===================================================== */
  // Podemos dar valores por defecto a los parámetros.
  // Así, si no los pasan, toman ese valor.
  
  function suma(a = 0, b = 0) {
    return a + b;
  }
  
  console.log(suma(1, 2));         // 3
  console.log(suma(1));            // 1 (b=0)
  console.log(suma(undefined, 2)); // 2
  console.log(suma());             // 0
  
  
  /* =====================================================
     3. NULL COALESCING (??)
     ===================================================== */
  // El operador ?? devuelve el primer valor que NO sea null o undefined.
  
  function saludo(nombre1, nombre2) {
    return "Hola " + (nombre2 ?? nombre1 ?? "abominacion");
  }
  
  console.log(saludo("Experimento 626", "Stitch")); // Hola Stitch
  console.log(saludo("Experimento 626"));           // Hola Experimento 626
  console.log(saludo());                            // Hola abominacion
  
  
  /* =====================================================
     4. TEMPLATE STRINGS (backticks ``)
     ===================================================== */
  // Se usan para escribir variables dentro de strings fácilmente.
  let nombre = "Ismael";
  console.log(`Hola ${nombre}`); // Hola Ismael
  
  
  /* =====================================================
     5. MÉTODOS DE STRINGS
     ===================================================== */
  
  let text = "  Apple, Banana, Kiwi   ";
  
  // .split() => convierte un string en array
  console.log(text.split(","));   // ["  Apple", " Banana", " Kiwi   "]
  console.log(text.split(", "));  // ["Apple", "Banana", "Kiwi"]
  
  // .substring() => corta usando posiciones inicio y fin
  console.log(text.substring(7, 13)); // "Banana"
  
  // .substr() => corta usando inicio y cantidad de caracteres
  console.log(text.substr(7, 6)); // "Banana"
  
  // .slice() => parecido a substring pero soporta índices negativos
  console.log(text.slice(-12, -6)); // "Banana"
  
  // .trim() => quita espacios al inicio y al final
  console.log(text.trim()); // "Apple, Banana, Kiwi"
  
  // .trimStart() y .trimEnd()
  console.log(text.trimStart()); // "Apple, Banana, Kiwi   "
  console.log(text.trimEnd());   // "  Apple, Banana, Kiwi"
  
  // .padStart() y .padEnd()
  let palabra = "Kiwi";
  console.log(palabra.padStart(6, "*")); // "**Kiwi"
  console.log(palabra.padEnd(8, "."));   // "Kiwi...."
  
  
  /* =====================================================
     6. MÉTODOS DE OBJETOS
     ===================================================== */
  const user = { firstname: "Marlene", lastname: "Duarte" };
  console.log(Object.keys(user)); // ["firstname", "lastname"]
  
  
  /* =====================================================
     7. MÉTODOS DE ARRAYS
     ===================================================== */
  const numbers = [4, 5, 2, 1, 7];
  
  // .flat() => aplana arrays dentro de arrays
  const nested = [[4, 5], [2, 1], [7]];
  console.log(nested.flat()); // [4, 5, 2, 1, 7]
  
  // .join() => une todos los elementos en un string
  console.log(numbers.join(", ")); // "4, 5, 2, 1, 7"
  
  // .includes() => verifica si existe un valor
  console.log(numbers.includes(3)); // false
  console.log(numbers.includes(7)); // true
  
  // .some() => ¿algún elemento cumple la condición?
  console.log(numbers.some(n => n < 3)); // true
  
  // .every() => ¿todos cumplen la condición?
  console.log(numbers.every(n => n < 10)); // true
  
  // .find() => primer elemento que cumple
  console.log(numbers.find(n => n % 2 === 0)); // 4
  
  // .findIndex() => índice del primer que cumple
  console.log(numbers.findIndex(n => n === 7)); // 4
  
  // .filter() => crea nuevo array con los que cumplen
  console.log(numbers.filter(n => n % 2 === 0)); // [4, 2]
  
  // .map() => transforma todos los elementos
  console.log(numbers.map(n => n * 2)); // [8, 10, 4, 2, 14]
  
  // .sort() => ordena (cuidado que convierte a string por defecto)
  console.log([41, 5, 2, 19, 7].sort()); // [19, 2, 41, 5, 7]
  console.log(numbers.sort((a, b) => a - b)); // [1, 2, 4, 5, 7]
  
  // .reduce() => reduce el array a un solo valor
  console.log(numbers.reduce((acc, cur) => acc + cur)); // suma total
  
  
  /* =====================================================
     8. DESTRUCTURING (Destructuración)
     ===================================================== */
  const persona = { nombre: "Ismael", altura: 1.75, puntaje: 3 };
  
  // Extraer propiedades en variables
  const { nombre: nombrePersona, altura } = persona;
  console.log(nombrePersona, altura); // "Ismael", 1.75
  
  // Valor por defecto si no existe
  const { edad = 20 } = persona;
  console.log(edad); // 20
  
  
  /* =====================================================
     9. SPREAD OPERATOR (...)
     ===================================================== */
  // Para clonar, combinar arrays u objetos.
  
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5];
  console.log(arr2); // [1, 2, 3, 4, 5]
  
  const userDefault = { nombre: "Usuario", altura: 1.7 };
  const userRafa = { ...userDefault, nombre: "Rafael" };
  console.log(userRafa); // { nombre: "Rafael", altura: 1.7 }
  
  
  /* =====================================================
     10. ASIGNACIÓN ABREVIADA DE OBJETOS
     ===================================================== */
  const alturaUser = 1.8;
  
  // Forma normal
  const userObj = { nombre: "Carlos", altura: alturaUser };
  
  // Forma abreviada (si variable = nombre de propiedad)
  const userObj2 = { nombre: "Carlos", alturaUser };
  console.log(userObj2); // { nombre: "Carlos", alturaUser: 1.8 }