function convertidorTemp(c) {
  return c * (9 / 5) + 32;
}

function resolvedor(a, b, c, positivo) {
  const disc = b ** 2 - 4 * a * c;
  if (disc < 0) throw new Error('Discriminante negativo');
  const raiz = Math.sqrt(disc);
  const xPos = (-b + raiz) / (2 * a);
  const xNeg = (-b - raiz) / (2 * a);
  return positivo ? xPos : xNeg;
}

function mejorParidad(num) {
  return num % 2 === 0 ? 'Par' : 'Impar';
}

function peorParidad(num) {
  const tabla = ['Par', 'Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par'];
  return tabla[num] ?? (num % 2 === 0 ? 'Par' : 'Impar');
}

module.exports = { convertidorTemp, resolvedor, mejorParidad, peorParidad };
