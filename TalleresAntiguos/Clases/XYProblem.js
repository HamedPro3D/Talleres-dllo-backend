//El problema XY es cuando una persona tiene un problema, se le ocurrio una solucion y pide ayuda para copletar esa solucion en vez de resolver el problema inicial.
//Ejemplo: "No tengo dinero para comprar comida, me ayudas a hacer un prestamo?" -> Problema real: No tengo dinero para comprar comida. Solucion propuesta: Hacer un prestamo.
class XYProblem {
    constructor() {
        this.problemaReal = "";
        this.solucionPropuesta = "";
    }

    setProblemaReal(problema) {
        this.problemaReal = problema;
    }

    setSolucionPropuesta(solucion) {
        this.solucionPropuesta = solucion;
    }

    getProblemaReal() {
        return this.problemaReal;
    }

    getSolucionPropuesta() {
        return this.solucionPropuesta;
    }

    resolverProblema() {
        if (this.problemaReal === "") {
            return "No hay problema real definido.";
        }
        // Aqui iria la logica para resolver el problema real.
        return `Resolviendo el problema real: ${this.problemaReal}`;
    }
}