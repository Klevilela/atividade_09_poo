interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;
}

class Quadrado implements FiguraGeometrica {
    constructor(private lado: number) {}

    calcularArea(): number { return this.lado ** 2; }
    calcularPerimetro(): number { return 4 * this.lado; }
    
}

class Triangulo implements FiguraGeometrica {
    constructor(private lados: number[]) {}

    calcularArea(): number {
        const s = this.calcularPerimetro() / 2;
        const [a, b, c] = this.lados;

        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    calcularPerimetro(): number {
        return this.lados.reduce((soma, lado) => soma + lado, 0);
    }
}

class Trapezio implements FiguraGeometrica {
    constructor(private bMaior: number, private bMenor: number, private alt: number, private lado1: number, private lado2: number) {}

    calcularArea(): number {
        return ((this.bMaior + this.bMenor) * this.alt) / 2;
    }

    calcularPerimetro(): number {
        return this.bMaior + this.bMenor + this.lado1 + this.lado2;
    }
}


let q: FiguraGeometrica = new Quadrado(2);
console.log("---Quadrado---");
console.log("Área:", q.calcularArea());
console.log("Perímetro:", q.calcularPerimetro(),"\n");

let t: FiguraGeometrica = new Triangulo([3, 4, 5]);
console.log("---Triângulo---");
console.log("Área:", t.calcularArea());
console.log("Perímetro:", t.calcularPerimetro(),"\n");

let trap: FiguraGeometrica = new Trapezio(5, 3, 4, 2, 3);
console.log("---Trapézio---");
console.log("Área:", trap.calcularArea());
console.log("Perímetro:", trap.calcularPerimetro(),"\n");
