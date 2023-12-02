var Quadrado = /** @class */ (function () {
    function Quadrado(lado) {
        this.lado = lado;
    }
    Quadrado.prototype.calcularArea = function () { return Math.pow(this.lado, 2); };
    Quadrado.prototype.calcularPerimetro = function () { return 4 * this.lado; };
    return Quadrado;
}());
var Triangulo = /** @class */ (function () {
    function Triangulo(lados) {
        this.lados = lados;
    }
    Triangulo.prototype.calcularArea = function () {
        var s = this.calcularPerimetro() / 2;
        var _a = this.lados, a = _a[0], b = _a[1], c = _a[2];
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    };
    Triangulo.prototype.calcularPerimetro = function () {
        return this.lados.reduce(function (soma, lado) { return soma + lado; }, 0);
    };
    return Triangulo;
}());
var Trapezio = /** @class */ (function () {
    function Trapezio(baseMaior, baseMenor, altura, lado1, lado2) {
        this.baseMaior = baseMaior;
        this.baseMenor = baseMenor;
        this.altura = altura;
        this.lado1 = lado1;
        this.lado2 = lado2;
    }
    Trapezio.prototype.calcularArea = function () {
        return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
    };
    Trapezio.prototype.calcularPerimetro = function () {
        return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
    };
    return Trapezio;
}());
// Teste
var q = new Quadrado(2);
console.log("---Quadrado---");
console.log("Área:", q.calcularArea());
console.log("Perímetro:", q.calcularPerimetro(), "\n");
var t = new Triangulo([3, 4, 5]);
console.log("---Triângulo---");
console.log("Área:", t.calcularArea());
console.log("Perímetro:", t.calcularPerimetro(), "\n");
var trap = new Trapezio(5, 3, 4, 2, 3);
console.log("---Trapézio---");
console.log("Área:", trap.calcularArea());
console.log("Perímetro:", trap.calcularPerimetro(), "\n");
