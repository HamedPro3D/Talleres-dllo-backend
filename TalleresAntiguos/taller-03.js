function desglosarString(texto, tipo) {
  const vocales = 'aeiouAEIOU';
  let c = 0;
  for (const ch of texto) {
    if (vocales.includes(ch)) {
      if (tipo === 'vocales') c++;
    } else if (tipo === 'consonantes' && /[a-z]/i.test(ch)) {
      c++;
    }
  }
  return c;
}

function twoSum(nums, objetivo) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === objetivo) return [i, j];
    }
  }
  return [];
}

function conversionRomana(rom) {
  const v = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let tot = 0;
  for (let i = 0; i < rom.length; i++) {
    const a = v[rom[i]];
    const s = v[rom[i + 1]];
    tot += s > a ? -a : a;
  }
  return tot;
}

function descomposicion(texto) {
  const [palabra, ...dic] = texto.split(',');
  for (let i = 0; i < dic.length; i++) {
    for (let j = 0; j < dic.length; j++) {
      if (dic[i] + dic[j] === palabra) return [dic[i], dic[j]];
    }
  }
  return [];
}

module.exports = { desglosarString, twoSum, conversionRomana, descomposicion };
