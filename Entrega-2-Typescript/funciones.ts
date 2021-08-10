export class opSuma {
    numeroA;
    numeroB;
    constructor(valorA : number, valorB : number) {
        this.numeroA = valorA;
        this.numeroB = valorB;
    }
    operacion() {
        return this.numeroA + this.numeroB;
    }
}

export class opResta {
    numeroA;
    numeroB;
    constructor(valorA : number, valorB : number) {
        this.numeroA = valorA;
        this.numeroB = valorB;
    }
    operacion() {
        return this.numeroA - this.numeroB;
    }
}
