function convertidorTemp(c) {
    return c * (9 / 5) + 32
}

console.log(convertidorTemp(10))

function resolvedor(a, b, c, positivo) {
    let raizPos = Math.sqrt(b**2 - 4 * a * c)
    let xPos = (-b + raizPos) / (2 * a)
    let xNeg = (-b - raizPos) / (2 * a)
    if (positivo == true)  return xPos
    else return xNeg
}

console.log(resolvedor(1, 5, 4, true))

function mejorParidad(num) {
    if (num % 2 == 0)
        return "Par"
    else
        return "Impar"
}

console.log(mejorParidad(4))

function peorParidad(num) {
    if (num == 0) return "Par"
    else if (num == 1) return "Impar"
    else if (num == 2) return "Par"
    else if (num == 3) return "Impar"
    else if (num == 4) return "Par"
    else if (num == 5) return "Impar"
    else if (num == 6) return "Par"
    else if (num == 7) return "Impar"
    else if (num == 8) return "Par"
    else if (num == 9) return "Impar"
    else if (num == 10) return "Par"
}

console.log(peorParidad(5))