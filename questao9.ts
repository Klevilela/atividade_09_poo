import { Quadrado, Trapezio, Triangulo, Retangulo} from "./questao8";

class testarFormas{
    quadrado: Quadrado = new Quadrado(2);
    trapezio: Trapezio = new Trapezio(5, 3, 4, 2, 3);
    triangulo: Triangulo = new Triangulo([3, 4, 5]);
    retangulo: Retangulo = new Retangulo(2, 2);
}


function main(): void {
    let teste: testarFormas = new testarFormas();
    let teste1: number = teste.quadrado.comparar(teste.triangulo);
    let teste2: number = teste.trapezio.comparar(teste.quadrado);
    let teste3: number = teste.quadrado.comparar(teste.retangulo);
    let teste4: number = teste.triangulo.comparar(teste.trapezio);
    console.log(teste1);
    console.log(teste2);
    console.log(teste3);
    console.log(teste4);
}

main();