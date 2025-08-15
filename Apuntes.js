let variable1 =1; 
console.log(typeof variable1); //number
 
const variable2 = "1";
console.log(typeof variable2)//string


function suma(a, b) {
    return a + b;
}

console.log(suma(variable1, variable2)); // "11" (string concatenation)

const suma2 = (a, b) => {
    return a + b;
}

const suma3 = function(a, b) {
    return a + b;
}

let variabloenosospechopsa = 1;

if (variabloenosospechopsa === 1) {
    console.log("La variable es igual a 1");
}else if (variabloenosospechopsa === 2) {
    console.log("La variable es igual a 2");
}else {
    console.log("La variable no es ni 1 ni 2");
}

// == valor iguañ
// === valor y tipo igual
// != valor diferente
// !== valor y tipo diferente

const maxFactorial = 10;
let factorial = 1;

for (let i = 1; i <= maxFactorial; i++) {
    factorial *= i; // factorial = factorial * i
}
console.log(`El factorial de ${maxFactorial} es ${factorial}`);

const acelerando = true;
let velocidad = 0;

// COVERSION A NUMEROS

const numberstring = "123.15";

console.log(numberstring); // string
console.log(parseInt(numberstring)); // Numero Entero
console.log(parseFloat(numberstring)); // Numero Decimal
console.log(+numberstring); // Numero Decimal

const booleanString = true;
console.log(booleanString); // true
console.log(+booleanString); // 1


//Truly // Falsy
const falsyValues = [0, "", null, undefined, NaN, false, -0];

//Objetos 

const perro = {
    raza: "Labrador",
    edad: 4,
    nombre: "Tequila",
    muerde: false,
    juzga: true,
};
console.log(perro.nombre); // "Tequila"
console.log(perro["muerde"]); // false

// Arrays
const estudiantes = [
    {
    nombre: "Martin Elias",
    velocidad: 9001,
    },
    {
    nombre: "Diomedes",
    numHijos: 9002,
    },
];
console.log(estudiantes.length); // 2
console.log(estudiantes[0].velocidad); // 9001
console.log(estudiantes["1"].numHijos); // 9002

/* 
Lista: Es una colección ordenada de elementos, 
donde cada elemento se identifica por un índice numérico. 
Se utiliza para almacenar múltiples elementos del mismo tipo. 

Array: Es una colección ordenada de elementos, 
donde cada elemento se identifica por un índice numérico. 
Se utiliza para almacenar colecciones de elementos homogéneos. 

Objeto: Es una colección de pares clave-valor, 
donde cada valor está asociado a una clave única. 
Se utiliza para representar entidades complejas con propiedades distintas. 
*/