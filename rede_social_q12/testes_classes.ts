import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RedeSocial } from "./RedeSocial";
import { App } from "./App";

/*let perfil1 = new Perfil(1, 'Joao', 'joao@mail.com')
let perfil2 = new Perfil(2, 'Maria', 'maria@mail.com')
let perfil3 = new Perfil(4, 'Jose', 'jose@mail.com')

let postagem1 = new Postagem(0, 'lorem ipsum', 4, 2, new Date('2023-11-01'), perfil1)
let postagem2 = new Postagem(8, 'dolor sit', 8, 1, new Date('2023-11-01'), perfil2)
let postagem3 = new Postagem(45, 'amet', 7, 3, new Date('2023-11-01'), perfil3)

let postagemAvancada1 = new PostagemAvancada(1, 'alguma coisa', 9, 3, new Date('2023-11-01'), perfil2, 3)
let postagemAvancada2 = new PostagemAvancada(3, 'alguma coisa coisa', 12, 6, new Date('2023-11-03'), perfil3, 2)
let postagemAvancada3 = new PostagemAvancada(4, 'bla', 15, 8, new Date('2023-11-02'), perfil1, 2)

let repositorio_perfis = new RepositorioDePerfis()

let postagens:Postagem[] = []
postagens.push(postagem1)
postagens.push(postagem2)
postagens.push(postagem3)

let repositorio_postagens = new RepositorioDePostagens(postagens)

repositorio_perfis.incluir(perfil1)
repositorio_perfis.incluir(perfil2)
repositorio_perfis.incluir(perfil3)

repositorio_postagens.incluir(postagem1)
repositorio_postagens.incluir(postagem2)
repositorio_postagens.incluir(postagem3)

repositorio_postagens.incluir(postagemAvancada1)
repositorio_postagens.incluir(postagemAvancada2)
repositorio_postagens.incluir(postagemAvancada3)

postagem1.curtir()
console.log(postagem1.curtidas)
postagem1.descurtir()
console.log(postagem1.descurtidas)
console.log(postagem1.ehPopular())

postagemAvancada1.curtir()
console.log(postagemAvancada1.curtidas)
postagemAvancada1.descurtir()
console.log(postagemAvancada1.descurtidas)
console.log(postagemAvancada1.ehPopular())
postagemAvancada1.decrementarVisualizacoes()
console.log(postagemAvancada1.vizualizacoes_restantes)
postagemAvancada1.adicionarHashtag('#latim')
console.log(postagemAvancada1.existeHashtag('#latim'))

console.log(repositorio_postagens.consultar(1))
console.log(repositorio_postagens.consultar(5, 'dolor sit'))

console.log(repositorio_perfis.consultar(2))
console.log(repositorio_perfis.consultar(2, 'Joao'))
console.log(repositorio_perfis.consultar(3, 'Carlos','joao@mail.com'))
let repositorio_perfis = new RepositorioDePerfis()
const rede_social = new RedeSocial(repositorio_perfis, repositorio_postagens)
const app = new App(rede_social)
app.usarOpcoes()*/

let rede_social = new RedeSocial()
//let rep_perfis:RepositorioDePerfis = new RepositorioDePerfis()
//let rep_perfis:RepositorioDePerfis[]
//let rep_postagens:RepositorioDePostagens= new RepositorioDePostagens()
//rep_perfis = rede_social.
//console.log(rede_social.rep_perfis)
//console.log(rede_social.repDePostagens.postagens)
let perfil:Perfil
let postagem:Postagem
let postagemAvancada:PostagemAvancada

const perfil1 = new Perfil(1, 'c', 'd')
perfil = new Perfil(2, 's', 's')
const perfil3 = new Perfil(3, 'z', 'w')

const postagemAvancada1 = new PostagemAvancada(1,'sd',3,4,new Date('2022-10-10'), perfil, 5)
postagemAvancada = new PostagemAvancada(2,'ssdd',5,4,new Date('2022-10-10'), perfil1, 5)
postagem = new Postagem(3,'ax', 4, 2, new Date('2023-10-12'), perfil)

/* rede_social.incluirPerfil(perfil1)
rede_social.incluirPerfil(perfil)
rede_social.incluirPerfil(perfil3)
 */
rede_social.incluirPerfil(perfil1)
rede_social.incluirPerfil(perfil)
rede_social.incluirPerfil(perfil3)
console.log(rede_social.repDePerfis)

rede_social.incluirPostagem(postagemAvancada1)
rede_social.incluirPostagem(postagemAvancada)
//rede_social.incluirPostagem(postagemAvancada)
rede_social.incluirPostagem(postagem)

console.log(rede_social.repDePostagens)

console.log(rede_social.consultarPerfil(2))
console.log(rede_social.consultarPerfil(1))

console.log(rede_social.consultarPostagens(5, 'sd'))
console.log(rede_social.consultarPostagens(1, 'sds', '#las', perfil1))

rede_social.curtir(3)
console.log(rede_social.repDePostagens)

rede_social.decrementarVisualizacoes(postagemAvancada1)
console.log(rede_social.repDePostagens)

console.log(rede_social.exibirPostagensPorPerfil(1))

postagemAvancada1.adicionarHashtag('#flamengo')
postagemAvancada.adicionarHashtag('#salve Maria')

console.log(rede_social.repDePostagens.postagens)
console.log(rede_social.exibirPostagensPorHashtag('#flamengo'))