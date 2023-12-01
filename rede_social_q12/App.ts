import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { RepositorioDePostagens } from "./RepositorioDePostagens";
import * as fs from "fs";

//import { incluirPerfil } from "./FuncionalidadesApp";

const prompt = require("prompt-sync");
const input = prompt();

const INCLUIR_PERFIL: string = "1";
const CONSULTAR_PERFIL: string = "2";
const INCLUIR_POSTAGEM: string = "3";
const CONSULTAR_POSTAGEM: string = "4";
const CURTIR: string = "5";
const DESCURTIR: string = "6";
const DECREMENTAR_VIZUALIZACOES: string = "7";
const EXIBIR_POSTAGENS_POR_PERFIL: string = "8";
const EXIBIR_POSTAGENS_POR_HASHTAG: string = "9";
const SAIR: string = "0";

export class App {
  private _redeSocial: RedeSocial;

  constructor(redeSocial: RedeSocial) {
    this._redeSocial = redeSocial;
  }

  get redeSocial() {
    return this._redeSocial;
  }

  carregarPerfildeArquivo() {
    const arquivo = fs.readFileSync("Perfis.txt", "utf-8");
    const linhas = arquivo.split("\n");
    let perfis: string = `PERFIS CARREGADOS\n`;

    for (let linha of linhas) {
      let id = linha.split(";")[0];
      let nome = linha.split(";")[1];
      let email = linha.split(";")[2];

      perfis += `Id: ${id}  - Nome: ${nome} - Email: ${email}\n`;
    }

    return perfis;
  }

  carregarPostagensdeArquivo() {
    const arquivo = fs.readFileSync("Postagens.txt", "utf-8");
    const linhas = arquivo.split("\n");
    let postagens_carregadas: string = `POSTAGENS CARREGADAS\n`;

    for (let linha of linhas) {
      let atrib_linha = linha.split(";");
      let id = atrib_linha[0];
      let tipo_postagem =
        atrib_linha.length > 6 ? "PostagemAvancada" : "Postagem";

      let texto = atrib_linha[1];
      let curtidas = atrib_linha[2];
      let descurtidas = atrib_linha[3];
      let data = atrib_linha[4];
      let perfil = atrib_linha[5];
      //let perfil = linha.split(';')[6]
      //let str_perfil = JSON.parse(perfil)
      //let id = linha.split(';')[0]

      if (tipo_postagem === "Postagem") {
        postagens_carregadas += `\nId: ${id}\nTexto: ${texto}\nCurtidas: ${curtidas}\nDescurtidas: ${descurtidas}\nData de publicação: ${data}\nPerfil: ${perfil}\n`;
      }

      if (tipo_postagem === "PostagemAvancada") {
        //let hashtag = linha.split(';')[7]
        //let visualizacoes_restantes = atrib_linha[5]
        let visualizacoes_restantes = atrib_linha[6];
        let linha_postagem_avancada = `Visualizações Restantes: ${visualizacoes_restantes}\n`;
        postagens_carregadas += `\nId: ${id}\nTexto: ${texto}\nCurtidas: ${curtidas}\nDescurtidas: ${descurtidas}\nData de publicação: ${data}\nPerfil: ${perfil}\nVisualizações restantes: ${visualizacoes_restantes}\n`;
        postagens_carregadas += linha_postagem_avancada;
      }
    }
    console.log(linhas[8].split(";")[6]);
    return postagens_carregadas;
  }

  gravarPerfis() {
    console.log("CADASTRANDO PERFIS");
    let linha_perfil: string = ``;
    let linhas_perfis: string = ``;
    let perfis_cadastrados = this.redeSocial.repDePerfis.repDePerfis;

    for (let perfil of perfis_cadastrados) {
      linha_perfil += `${perfil.id};${perfil.nome};${perfil.email}\n`;
      linhas_perfis += linha_perfil;
    }
    //linhas_perfis = linhas_perfis.slice(0, linhas_perfis.length)
    fs.writeFileSync("Perfis.txt", linhas_perfis, { flag: "a" });
  }

  gravarPostagens() {
    console.log("POSTAGENS CARREGADAS");
    let linha_postagem: string = ``;
    let linhas_postagens: string = ``;
    let postagens_carregadas = this.redeSocial.repDePostagens.postagens;

    for (let post of postagens_carregadas) {
      linha_postagem += `${post.id};${post.texto};${post.curtidas};${post.descurtidas};${post.date};${post.perfil};\n`;
      linhas_postagens += linha_postagem;

      if (post instanceof PostagemAvancada) {
        linha_postagem += `${post.id};${post.texto};${post.curtidas};${post.descurtidas};${post.date};${post.perfil};${post.visualizacoesRestantes};${post.hashtags}\n`; //${post.hashtags}
        linhas_postagens += linha_postagem;
      }
    }

    fs.writeFileSync("Postagens.txt", linhas_postagens, { flag: "a" });
  }

  exibirMenu(): void {
    let menu = ``;
    menu += `\nREDE SOCIAL\n\n`;
    menu += `1- INCLUIR PERFIL\n`;
    menu += `2- CONSULTAR PERFIL\n`;
    menu += `3- INCLUIR POSTAGEM\n`;
    menu += `4- CONSULTAR POSTAGEM\n`;
    menu += `5- CURTIR POSTAGEM\n`;
    menu += `6- DESCURTIR POSTAGEM\n`;
    menu += `7- DECREMENTAR VISUALIZAÇÕES\n`;
    menu += `8- EXIBIR POSTAGENS POR PERFIL\n`;
    menu += `9- EXIBIR POSTAGENS POR HASHTAG\n`;
    menu += `\n0-SAIR`;

    console.log(menu);
  }

  usarOpcoes(): void {
    let opcao: string;
    //app.gravarPerfis()
    do {
      let enter_to_continue: string = input("Aperter <enter> para continuar");
      //console.log(this.carregarPerfildeArquivo())
      this.exibirMenu();
      opcao = input("\nOPÇÃO: ");

      switch (opcao) {
        case INCLUIR_PERFIL:
          incluirPerfil();
          break;
        case CONSULTAR_PERFIL:
          consultarPerfil();
          break;
        case INCLUIR_POSTAGEM:
          incluirPostagem();
          break;
        case CONSULTAR_POSTAGEM:
          consultarPostagens();
          break;
        case CURTIR:
          curtirPostagem();
          break;
        case DESCURTIR:
          descurtirPostagem();
          break;
        case DECREMENTAR_VIZUALIZACOES:
          decrementarVisualizacoes();
          break;
        case EXIBIR_POSTAGENS_POR_PERFIL:
          exibirPostagensPorPerfil();
          break;
        case EXIBIR_POSTAGENS_POR_HASHTAG:
          exibirPostagensPorHashtag();
          break;
      }
      //enter_to_continue = input('\n   Aperte <enter> para continuar')
      //opcao = input('\nOPÇÃO: ')
    } while (opcao != SAIR);
    app.gravarPerfis();
    app.gravarPostagens();
    console.log("APLICACAO ENCERRADA");
    //app.gravarPerfis()
  }
}

//const nome = input('Nome: ')

function incluirPerfil(): void {
  //let redeSocial:RedeSocial
  console.log("INCLUIR PERFIL\n");
  let id: number = Number(input("ID: "));
  let nome: string = input("NOME: ");
  let email: string = input("EMAIL: ");
  perfil = new Perfil(id, nome, email);

  if (rede_social.repDePerfis instanceof RepositorioDePerfis) {
    //repositorio_perfis.incluir(perfil)
    rede_social.incluirPerfil(perfil);
  }

  console.log("PERFIL INCLUÍDO COM SUCESSO");
  console.log(rede_social.repDePerfis);
}

function consultarPerfil() {
  console.log("CONSULTAR PERFIL");
  let id: number = Number(input("ID: "));
  let nome: string = input("NOME: ");
  let email: string = input("EMAIL: ");

  if (rede_social.repDePerfis instanceof RepositorioDePerfis) {
    console.log(rede_social.consultarPerfil(id, nome, email));
  }
  //console.log(rede_social.consultarPerfil(id, nome, email))
  //perfil = new Perfil(id, nome, email)
  //let redeSocial:RedeSocial
}

function incluirPostagem() {
  console.log("\nINCLUIR POSTAGEM\n");
  console.log(
    "TIPO DE POSTAGEM\n1-POSTAGEM NORMAL\n2-POSTAGEM AVANÇADA\n3-INCLUIR HASHTAG\n"
  );
  const tipo_postagem = input("TIPO: ");
  let idPerfil: number;
  idPerfil = Number(input("INFORME A ID DO PERIL: "));
  if (rede_social.consultarPerfil(idPerfil)) {
    if (rede_social.repDePostagens instanceof RepositorioDePostagens) {
      if (tipo_postagem == "1") {
        let id: number = Number(input("ID DA POSTAGEM: "));
        let texto: string = input("TEXTO DA POSTAGEM: ");
        let curtidas: number = Number(input("CURTIDAS: "));
        let descurtidas: number = Number(input("DESCURTIDAS: "));
        let data_postagem = input(
          "DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): "
        );
        let data: Date = new Date(data_postagem);
        let perfil: Perfil;

        let idPerfil: number = Number(input("Id do perfil: "));
        perfil = rede_social.repDePerfis.consultar(idPerfil);

        perfil = rede_social.repDePerfis.consultar(idPerfil);

        postagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
        console.log("POSTAGEM INCLUÍDA COM SUCESSO");
        if (postagem.ehPopular()) {
          console.log("\nA POSTAGEM É POPULAR");
        } else {
          console.log("\nA POSTAGEM NÃO É POPULAR");
        }
      }
      if (tipo_postagem == "2") {
        let id: number = Number(input("ID DA POSTAGEM: "));
        let texto: string = input("TEXTO DA POSTAGEM: ");
        let curtidas: number = Number(input("CURTIDAS: "));
        let descurtidas: number = Number(input("DESCURTIDAS: "));
        let data_postagem = input(
          "DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): "
        );
        let data: Date = new Date(data_postagem);
        let visualizacoesRestantes: number = Number(
          input("VISUALIZAÇÕES RESTANTES: ")
        );

        postagem = new PostagemAvancada(
          id,
          texto,
          curtidas,
          descurtidas,
          data,
          perfil,
          visualizacoesRestantes
        );

        console.log("POSTAGEM INCLUÍDA COM SUCESSO");
      }
      if (tipo_postagem == "3") {
        if (postagem instanceof PostagemAvancada) {
          console.log("\nADICIONAR HASHTAG");
          let id: number = Number(input("ID DA POSTAGEM: "));
          if (rede_social.repDePostagens.consultar(id)) {
            const hashtag: string = input("HASHTAG: ");
            postagem.adicionarHashtag(hashtag);
            console.log("HASHTAG ADICIONADA");
            console.log(rede_social.repDePostagens.postagens);
          }
        }
      }
      //postagens.push(postagem)
      rede_social.incluirPostagem(postagem);
      console.log(rede_social.repDePostagens.postagens);
    }
    //repositorio_postagem.incluir(postagem)
  }
}

function consultarPostagens() {
  console.log("CONSULTAR POSTAGEM");
  let id: number = Number(input("ID DA POSTAGEM: "));
  let texto: string = input("TEXTO: ");
  let hashtag: string = input("HASHTAG: ");

  //if (rede_social instanceof PostagemAvancada)
  //console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil))
  if (rede_social.repDePostagens instanceof Postagem) {
    console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil));
    console.log(typeof id);
  }

  console.log(rede_social.consultarPostagens(id, texto));
}

function curtirPostagem() {
  let id: number = Number(input("ID DA POSTAGEM: "));
  rede_social.curtir(id);
  console.log("POSTAGEM CURTIDA");
  console.log(rede_social.repDePostagens.postagens);
}

function descurtirPostagem() {
  let id: number = Number(input("ID DA POSTAGEM: "));
  rede_social.descurtir(id);
  console.log(rede_social.repDePostagens.postagens);
  console.log("POSTAGEM DESCURTIDA");
  //rede_social.descurtir(id)
  //console.log('POSTAGEM DESCURTIDA')
}

function decrementarVisualizacoes() {
  console.log("DECREMENTAR VIZUALIZACOES\n");
  console.log(rede_social.repDePostagens.postagens);
  let id: number = Number(input("ID DA POSTAGEM: "));
  if (rede_social.repDePostagens.consultar(id)) {
    rede_social.decrementarVisualizacoes(postagem_avancada);
  }
  if (repositorio_postagem.consultar(id)) {
    rede_social.decrementarVisualizacoes(postagem_avancada);
  }
  //postagem_avancada.
  console.log("VIZUALISAÇÃO DECREMENTADA");
  console.log(rede_social.repDePostagens.postagens);
}

function exibirPostagensPorPerfil() {
  console.log("EXIBIR POSTAGENS POR PERFIL");
  let id: number = Number(input("ID DO PERFIL"));
  console.log(rede_social.exibirPostagensPorPerfil(id));
}

function exibirPostagensPorHashtag() {
  console.log("EXIBIR POSTAGENS POR PERFIL");
  let hashtag: string = input("HASHTAG: ");

  if (rede_social.repDePostagens.postagens instanceof PostagemAvancada) {
    rede_social.exibirPostagensPorHashtag(hashtag);
  }
  console.log(rede_social.exibirPostagensPorHashtag(hashtag));
}

let perfil: Perfil;
let postagem: Postagem;
let postagem_avancada: PostagemAvancada;

//let perfis:Perfil[] = []
//let postagens:Postagem[] = []

//let repositorio_perfis = new RepositorioDePerfis()
//
let repositorio_postagem = new RepositorioDePostagens();
let rede_social: RedeSocial = new RedeSocial();

const app = new App(rede_social);
app.usarOpcoes();
//console.log(app.carregarPerfildeArquivo())

//app.gravarPerfis()
console.log(app.carregarPostagensdeArquivo());

//console.log(rede_social.repDePerfis)
//console.log(rede_social.repDePostagens)
//perfil = new Perfil(1, 'Joao', 'asd')
//rede_social.repDePerfis.incluir(perfil)
//rede_social.incluirPerfil(perfil)
//console.log(typeof rede_social.repDePerfis)
