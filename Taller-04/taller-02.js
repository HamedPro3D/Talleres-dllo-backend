function findMax(lista){ let m=lista[0]; for(let i=1;i<lista.length;i++) if(lista[i]>m) m=lista[i]; return m }
function includes(lista, numero){ for(const x of lista) if(x==numero) return true; return false }
function sum(lista){ let t=0; for(const x of lista) t+=x; return t }
function missingNumbers(lista){
  let min=lista[0], max=lista[0];
  for(const x of lista){ if(x<min) min=x; if(x>max) max=x; }
  const falt=[]; for(let i=min;i<=max;i++){ let ok=false; for(const x of lista){ if(x==i){ ok=true; break; } } if(!ok) falt.push(i); }
  return falt;
}
module.exports = { findMax, includes, sum, missingNumbers };
