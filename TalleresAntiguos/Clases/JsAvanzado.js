//Null Coalescing Operator
function saludo(nombre1, nombre2){
    return "Hola " + (nombre2 ?? nombre1 ?? "Abominacion")
}

console.log(saludo("experimetno 626","Stitch"))
console.log(saludo("experimetno 626",undefined))
console.log(saludo(undefined))

//Template Strings
function saludo1(nombre1, nombre2){
    return `Hola ${nombre2 ?? nombre1 ?? "Abominacion"}`
}

console.log(saludo1("experimetno 626","Stitch"))

//Manipulacion de strings
let text = "Apple, Banana, Kiwi"
//Split
console.log(text.split(", "))
//Substring
console.log(text.substring(7))
console.log(text.substring(7,13))
//Substr
console.log(text.substr(7, 6))
//Slice
console.log(text.slice(7, -6))
//Trim
console.log(text.trim().slice(7, 13))

//Object.keys()
const obj = {
    key: "value",
}

console.log(Object.keys(obj))

const user = {
    firstname: "Marlene",
    lastname: "Duarte"
}

console.log(Object.keys(user))
//.flat

const numbers = [[4,5], [2,1], [1], [7]]

console.log(numbers.flat())

//.join

const numbers1 = [4, 5, 2, 1, 1, 7]

console.log(numbers1.join(", "))

//.includes

const numbers3 = [4, 5, 2, 1, 1, 7]

console.log(numbers3.includes(5))
console.log(numbers3.includes(10))