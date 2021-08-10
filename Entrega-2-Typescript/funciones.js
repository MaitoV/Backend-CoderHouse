"use strict";
exports.__esModule = true;
exports.opResta = exports.opSuma = void 0;
var opSuma = /** @class */ (function () {
    function opSuma(numero1, numero2) {
        this.valorA = numero1;
        this.valorB = numero2;
    }
    opSuma.prototype.operacion = function () {
        return this.valorA - this.valorB;
    };
    return opSuma;
}());
exports.opSuma = opSuma;
var opResta = /** @class */ (function () {
    function opResta(numero1, numero2) {
        this.valorA = numero1;
        this.valorB = numero2;
    }
    opResta.prototype.operacion = function () {
        return this.valorA - this.valorB;
    };
    return opResta;
}());
exports.opResta = opResta;
