
interface IComparavel {
    comparar(outraFormaGeo: FormaGeometrica): number;
}

abstract class FormaGeometrica {
    abstract calcularArea(): number;
}

class Quadrado extends FormaGeometrica implements IComparavel {

    constructor(private lado: number) {
        super();
    }
    
    calcularArea(): number { return this.lado ** 2; }
    calcularPerimetro(): number { return 4 * this.lado; }
   
    comparar(outraFormaGeo: FormaGeometrica): number {
    
        const area = this.calcularArea();
        const areaOutraForma = outraFormaGeo.calcularArea();

        if (area < areaOutraForma) {
            return -1;
        } else if (area > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}
class Triangulo extends FormaGeometrica implements IComparavel {

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

    comparar(outraFormaGeo: FormaGeometrica): number {

        const area = this.calcularArea();
        const areaOutraForma = outraFormaGeo.calcularArea();

        if (area < areaOutraForma) {
            return -1;
        } else if (area > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

class Trapezio extends FormaGeometrica implements IComparavel {
   
    constructor(private baseMaior: number, 
        private baseMenor: number, private altura: number, 
        private lado1: number, private lado2: number) {super(); }

        calcularArea(): number {
            return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
        }
    
        calcularPerimetro(): number {
            return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
        }

    comparar(outraFormaGeo: FormaGeometrica): number {

        const area = this.calcularArea();
        const areaOutraForma = outraFormaGeo.calcularArea();

        if (area < areaOutraForma) {
            return -1;
        } else if (area > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}
class Retangulo extends FormaGeometrica implements IComparavel {
    largura: number;
    altura: number;

    constructor(largura: number, altura: number) {
        super();
        this.largura = largura;
        this.altura = altura;
    }

    calcularArea(): number {
        return this.largura * this.altura;
    }

    comparar(outraFormaGeo: FormaGeometrica): number {

        const area = this.calcularArea();
        const areaOutraForma = outraFormaGeo.calcularArea();

        if (area < areaOutraForma) {
            return -1;
        } else if (area > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Implementação
const quadrado = new Quadrado(2);
const triangulo = new Triangulo([3, 4, 5]);
const trapezio =  new Trapezio(5, 3, 4, 2, 3);
const retangulo = new Retangulo(2,2)

const comparacao1 = quadrado.comparar(triangulo);
const comparacao2 = trapezio.comparar(quadrado);
const comparacao3 = quadrado.comparar(retangulo);
const comparacao4 = triangulo.comparar(trapezio);

console.log("Quadrado e Triângulo: " + comparacao1);
console.log("Trapézio e Quadrado: " + comparacao2);
console.log("Quadrado e Retângulo: " + comparacao3);
console.log("Triângulo e Trapézios: " + comparacao4);
