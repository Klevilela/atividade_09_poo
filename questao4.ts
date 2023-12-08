abstract class FiguraGeometrica {
    abstract calcularArea(): number;
    abstract calcularPerimetro(): number;
}

class Quadrado extends FiguraGeometrica {
    constructor(private lado: number) { super(); }

    calcularArea(): number { return this.lado ** 2; }
    calcularPerimetro(): number { return 4 * this.lado; }
}

class Triangulo extends FiguraGeometrica {
    constructor(private lados: number[]) {
        super();
    }
   
    calcularArea(): number {
        const s = this.calcularPerimetro() / 2;
        const [a, b, c] = this.lados;

        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    calcularPerimetro(): number {
        return this.lados.reduce((soma, lado) => soma + lado, 0);
    }
}

class Retangulo extends FiguraGeometrica {
    constructor(private base: number, private altura: number) { super(); }

    calcularArea(): number { return this.base * this.altura; }
    calcularPerimetro(): number { return 2 * (this.base + this.altura); }
}


let q = new Quadrado(2);
console.log("---Quadrado---");
console.log("Área:", q.calcularArea());
console.log("Perímetro:", q.calcularPerimetro(),"\n");

let t = new Triangulo([3, 4, 5]);
console.log("---Triângulo---");
console.log("Área:", t.calcularArea());
console.log("Perímetro:", t.calcularPerimetro(),"\n");

let r = new Retangulo(2, 8);
console.log("---Retângulo---");
console.log("Área:", r.calcularArea());
console.log("Perímetro:", r.calcularPerimetro(),"\n");
