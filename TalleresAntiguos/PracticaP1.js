// Desarrolle una función que reciba una lista de strings, y retorne la cantidad de strings con longitud mayor a 25 caracteres.

function MayorA(palabras){
    let mayora25 = 0
    for (let str of palabras){
        if (str.length > 25) mayora25++
    }
    return mayora25
}

console.log(MayorA(["Hola", "hola, me llamo hamed, este es un programa sencillo para probar si funciona ", "Pequeño"]))

// Desarrolle una función que retorne el resultado de una exponenciación dada la base y el exponente sin utilizar el operador respectivo

function exponenciación(base, exponente){
    let respuesta = 1
    for(let i = 0; i<exponente; i++){
        respuesta = respuesta*base
    }
    return respuesta
}

console.log(exponenciación(2,2))

//Desarrolle una función que retorne las ocurrencias de un elemento en una lista

function ocurrencias(lista, elemento){
    let contador = 0
    for (let objeto of lista){
        if (objeto == elemento){
            contador++
        }
    }
    return contador
}

console.log(ocurrencias([1,2,3,2,2,4], 2))

//Desarrolle una función que retorne el elemento n de la serie Fibonacci.

function fibonacci(n) {
    if (n <= 1) return n
    let a = 0, b = 1, temp
    for (let i = 2; i <= n; i++) {
        let temp = a + b
        a = b
        b = temp
    }
    return b
}

console.log(fibonacci(10))

// Desarrolle una función que retorne si una lista tiene duplicados o no.
//No pude hacerlo (respuesta de chatgpt)

function tieneDuplicados(lista) {
    let conjunto = new Set(lista);
    return conjunto.size !== lista.length;
}
// console.log(tieneDuplicados([1, 2, 3, 4])); // false
// console.log(tieneDuplicados([1, 2, 2, 3])); // true

//Desarrolle una función que retorne el elemento mas repetido de una lista.
//No pude hacerlo (respuesta de chatgpt)

function elementoMasRepetido(lista) {
    let conteo = {};
    let maxElemento = lista[0];
    let maxConteo = 0;

    for (let item of lista) {
        conteo[item] = (conteo[item] || 0) + 1;
        if (conteo[item] > maxConteo) {
            maxConteo = conteo[item];
            maxElemento = item;
        }
    }
    return maxElemento;
}
// console.log(elementoMasRepetido([1, 2, 2, 3, 3, 3, 4])); // 3

//Desarrolle una función que ordene una lista desordenada

function ordenarlista(lista) {
    return lista.sort((a, b) => a - b);
}
 console.log(ordenarlista([5, 3, 8, 1, 2]));

// Desarrolle una función que retorne el n-esimo elemento mas grande de una lista

function masgrande(lista){
    let mayor = 0
    let x = lista.length - 1
    while (x >= 0) {
        if (lista[x] > mayor) {
            mayor = lista[x]
        }
        x--
    }
    return mayor
}

console.log(masgrande([1,2,3,4,5]))

//Desarrolle una función que retorne el producto maximo de dos numeros de una lista.
//chatgpt
function productoMaximo(lista) {
    let ordenada = [...lista].sort((a, b) => b - a);
    return ordenada[0] * ordenada[1];
}
// console.log(productoMaximo([5, 9, 2, 8, 3])); // 72

//Desarrolle una función que realice una busqueda binaria de un elemento (y lo retorne)
//chatgpt

function busquedaBinaria(lista, elemento) {
    let inicio = 0;
    let fin = lista.length - 1;

    while (inicio <= fin) {
        let medio = Math.floor((inicio + fin) / 2);
        if (lista[medio] === elemento) return medio;
        if (lista[medio] < elemento) inicio = medio + 1;
        else fin = medio - 1;
    }
    return -1; // No encontrado
}
// console.log(busquedaBinaria([1, 3, 5, 7, 9], 5)); // 2


//Escribe una función que reciba dos números y retorne su suma.

function suma (a,b){
    return resultado = a + b
}

console.log(suma(2,1))

//Escribe una función que determine si un número es par o impar.

function paroimpar(a){
    if(a % 2 == 0){
        return "par"
    }else{
        return "impar"
    }
}

console.log(paroimpar(3))

//Escribe una función que reciba una palabra y determine si es un palíndromo (es decir, que se lee igual al derecho que al revés).

function palindromo(palabra){
    const strReversa = palabra.split('').reverse().join('');
    let x = strReversa
    if(palabra == strReversa){
        return "Palindromo"
    }else{
        return "No"
    }
}

console.log(palindromo("dinosaurio"))

//Escribe una función que reciba tres números y retorne el mayor de los tres.

function tresnumeros(a,b,c){
    let x = a
    if(a <= b) x = b
    if (b <= c) x = c
    return x
}

console.log(tresnumeros(14,22,2))

//Escribe una función que reciba una cadena de texto y cuente cuántas vocales (a, e, i, o, u) contiene.}

function contarbocales(a){
    cont = 0
    b = a.length -1
    while (b >= 0) {
        if (a[b] == "a" ||a[b] == "e" || a[b] == "i" || a[b] == "o" || a[b] == "u") {
            cont++; 
        }
        b--;  
    }
    return cont
}

console.log(contarbocales("perrau"))