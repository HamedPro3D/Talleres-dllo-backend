
function desglosarString(texto, tipo) {
  let vocales = "aeiouAEIOU";
  let contador = 0;
  for (let i = 0; i < texto.length; i++) {
    if (vocales.includes(texto[i])) {
      if (tipo === "vocales") contador++;
    } else {
      if (tipo === "consonantes" && texto[i].match(/[a-z]/i)) contador++;
    }
  }
  return contador;
}

console.log(desglosarString("murcielagos", "vocales")); 
console.log(desglosarString("murcielagos", "consonantes")); 

function twoSum(numeros, objetivo) {
  for (let i = 0; i < numeros.length; i++) {
    for (let j = i + 1; j < numeros.length; j++) {
      if (numeros[i] + numeros[j] === objetivo) {
        return [i, j];
      }
    }
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 4, 2], 6)); 

function conversionRomana(romano) {
  let valores = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
  let total = 0;
  for (let i = 0; i < romano.length; i++) {
    let actual = valores[romano[i]];
    let siguiente = valores[romano[i + 1]];
    if (siguiente > actual) {
      total -= actual;
    } else {
      total += actual;
    }
  }
  return total;
}

console.log(conversionRomana("III")); 
console.log(conversionRomana("XIV")); 
console.log(conversionRomana("MMXXIV")); 
console.log(conversionRomana("MCMXCVII")); 

function descomposicion(texto) {
  let partes = texto.split(",");
  let palabra = partes[0];
  let diccionario = partes.slice(1);

  for (let i = 0; i < diccionario.length; i++) {
    for (let j = 0; j < diccionario.length; j++) {
      if (diccionario[i] + diccionario[j] === palabra) {
        return [diccionario[i], diccionario[j]];
      }
    }
  }
  return [];
}

console.log(descomposicion("malhumor,al,hum,humor,m,mal,malhu"));
