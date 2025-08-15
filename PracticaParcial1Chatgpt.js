// =========================
// 1. Contar strings con más de 25 caracteres (while)
// =========================
function contarStringsLargos(lista) {
    let contador = 0;
    let i = 0;
    while (i < lista.length) {
        if (lista[i].length > 25) contador++;
        i++;
    }
    return contador;
}

// =========================
// 2. Exponenciación sin operador ** (while)
// =========================
function potencia(base, exponente) {
    let resultado = 1;
    let i = 0;
    while (i < exponente) {
        resultado *= base;
        i++;
    }
    return resultado;
}

// =========================
// 3. Contar ocurrencias de un elemento (while)
// =========================
function contarOcurrencias(lista, elemento) {
    let contador = 0;
    let i = 0;
    while (i < lista.length) {
        if (lista[i] === elemento) contador++;
        i++;
    }
    return contador;
}

// =========================
// 4. n-ésimo número de Fibonacci (while)
// =========================
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1, i = 2;
    while (i <= n) {
        let temp = a + b;
        a = b;
        b = temp;
        i++;
    }
    return b;
}

// =========================
// 5. Verificar si una lista tiene duplicados (while)
// =========================
function tieneDuplicados(lista) {
    let conjunto = new Set();
    let i = 0;
    while (i < lista.length) {
        if (conjunto.has(lista[i])) return true;
        conjunto.add(lista[i]);
        i++;
    }
    return false;
}

// =========================
// 6. Elemento más repetido (while)
// =========================
function elementoMasRepetido(lista) {
    let conteo = {};
    let maxElemento = lista[0];
    let maxConteo = 0;
    let i = 0;

    while (i < lista.length) {
        let item = lista[i];
        conteo[item] = (conteo[item] || 0) + 1;
        if (conteo[item] > maxConteo) {
            maxConteo = conteo[item];
            maxElemento = item;
        }
        i++;
    }
    return maxElemento;
}

// =========================
// 7. Ordenar una lista (while con bubble sort)
// =========================
function ordenarLista(lista) {
    let n = lista.length;
    let i = 0;
    while (i < n - 1) {
        let j = 0;
        while (j < n - i - 1) {
            if (lista[j] > lista[j + 1]) {
                let temp = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temp;
            }
            j++;
        }
        i++;
    }
    return lista;
}

// =========================
// 8. n-ésimo elemento más grande (while)
// =========================
function nEsimoMasGrande(lista, n) {
    let ordenada = ordenarLista([...lista]).reverse();
    return ordenada[n - 1];
}

// =========================
// 9. Producto máximo de dos números (while)
// =========================
function productoMaximo(lista) {
    let ordenada = ordenarLista([...lista]).reverse();
    return ordenada[0] * ordenada[1];
}

// =========================
// 10. Búsqueda binaria (while)
// =========================
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

// =========================
// Pruebas de todas las funciones
// =========================
console.log("1) Strings largos:", contarStringsLargos(["Hola", "Este string es muy largo con más de 25 caracteres", "Pequeño"]));
console.log("2) Potencia:", potencia(2, 5));
console.log("3) Ocurrencias:", contarOcurrencias([1, 2, 3, 2, 2, 4], 2));
console.log("4) Fibonacci:", fibonacci(10));
console.log("5) Tiene duplicados:", tieneDuplicados([1, 2, 2, 3]));
console.log("6) Más repetido:", elementoMasRepetido([1, 2, 2, 3, 3, 3, 4]));
console.log("7) Ordenar:", ordenarLista([5, 3, 8, 1, 2]));
console.log("8) n-ésimo más grande:", nEsimoMasGrande([5, 1, 9, 7, 3], 2));
console.log("9) Producto máximo:", productoMaximo([5, 9, 2, 8, 3]));
console.log("10) Búsqueda binaria:", busquedaBinaria([1, 3, 5, 7, 9], 5));