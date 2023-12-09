import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { IRepositorioPerfis, RepositorioDePerfis } from "./RepositorioDePerfis";
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
//const DECREMENTAR_VIZUALIZACOES: string = "7";
const EXIBIR_POSTAGENS_POR_PERFIL: string = "7";
const EXIBIR_POSTAGENS_POR_HASHTAG: string = "8";
const SAIR: string = "0";

export class App {
  private _redeSocial: RedeSocial;
  private _redeSocial2: RedeSocial;

  /* constructor(redeSocial: RedeSocial) {
    this._redeSocial = redeSocial;
  } */
  constructor() {
    this._redeSocial = new RedeSocial(new RepositorioDePerfis(), new RepositorioDePostagens())
    //this._redeSocial2 = new RedeSocial(new RepositorioDePostagens());
  }

  public get redeSocial() {
    return this._redeSocial;
  }
 
  /* get redeSocialPostagem(){
    return this._redeSocial2
  } */

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
    console.log("CADASTRANDO PERFIS...");
    let linha_perfil: string = ``;
    let linhas_perfis: string = ``;
  
    for (let perfil of acumulador_perfis) {
      linha_perfil += `${perfil.id};${perfil.nome};${perfil.email}\n`;
      linhas_perfis += linha_perfil
    }

    fs.writeFileSync("Perfis.txt", linhas_perfis, { flag: "a" });
  }

  gravarPostagens() {
    console.log("CADASTRANDO POSTAGENS...");
    let linha_postagem: string = ``;
    let linhas_postagens: string = ``;

    for (let post of acumulador_postagens) {
      
      linha_postagem += `${post.id};${post.texto};${post.curtidas};${post.descurtidas};${post.date}\n`;
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
    menu += `7- EXIBIR POSTAGENS POR PERFIL\n`;
    menu += `8- EXIBIR POSTAGENS POR HASHTAG\n`;
    menu += `\n0-SAIR`;

    console.log(menu);
  }

  usarOpcoes(): void {
    let opcao_persistencia:string
    opcao_persistencia = input('DESEJA GRAVAR OS DADOS NO ARQUIVO ?\n1-SIM\n2-NÃO\n>>')
    let opcao: string;
    
    //app.gravarPerfis()
    do {
      //let enter_to_continue: string = input("Aperter <enter> para continuar");
      opcao = input("\nOPÇÃO: ");
      try{
        //console.log(this.carregarPerfildeArquivo())
        //console.log(this.carregarPostagensdeArquivo())
        this.exibirMenu();
        let enter_to_continue: string = input("Aperter <enter> para continuar");

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
          case EXIBIR_POSTAGENS_POR_PERFIL:
            exibirPostagensPorPerfil();
            break;
          case EXIBIR_POSTAGENS_POR_HASHTAG:
            exibirPostagensPorHashtag();
            break;
        }
        
      }
      catch (e){console.log(e.message)}
      
      /* app.gravarPerfis();
      app.gravarPostagens(); */
      //enter_to_continue = input('\n   Aperte <enter> para continuar')
      //opcao = input('\nOPÇÃO: ')
      //app.gravarPerfis()
    }
    while (opcao != SAIR);
    console.log("APLICACAO ENCERRADA");
    
    /* let opcao_persistencia:string
    opcao_persistencia = input('DESEJA GRAVAR OS DADOS NO ARQUIVO ?\n1-SIM\n2-NÃO\n>>') */
    if (opcao_persistencia == '1'){
      app.gravarPerfis();
      app.gravarPostagens();
    }
  }
}


function incluirPerfil(): void {
  console.log("INCLUIR PERFIL\n");
  let id: number = Number(input("ID: "));
  let nome: string = input("NOME: ");
  let email: string = input("EMAIL: ");
  perfil = new Perfil(id, nome, email);
  
  if (app.redeSocial.repDePerfis instanceof RepositorioDePerfis) {
    app.redeSocial.incluirPerfil(perfil)
    acumulador_perfis.push(perfil)
  }

  console.log("PERFIL INCLUÍDO COM SUCESSO");
  console.log(app.redeSocial.repDePerfis)
}

function consultarPerfil() {
  console.log("CONSULTAR PERFIL");
  let id: number = Number(input("ID: "));
  let nome: string = input("NOME: ");
  let email: string = input("EMAIL: ");

  if (app.redeSocial.repDePerfis instanceof RepositorioDePerfis) {
    //console.log(app.redeSocial.repDePerfis.consultar(id,nome, email));
    console.log(app.redeSocial.consultarPerfil(id, nome, email))
  }
}

function incluirPostagem() {
  console.log("\nINCLUIR POSTAGEM\n");
  console.log(
    "TIPO DE POSTAGEM\n1-POSTAGEM NORMAL\n2-POSTAGEM AVANÇADA\n3-INCLUIR HASHTAG\n"
  );
  const tipo_postagem = input("TIPO: ");
  let idPerfil: number;
  idPerfil = Number(input("INFORME A ID DO PERIL: "));
  if (app.redeSocial.repDePerfis.consultar(idPerfil)) {
    console.log(app.redeSocial.consultarPerfil(idPerfil))
    if (app.redeSocial.repDePostagens instanceof RepositorioDePostagens) {
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

        //let idPerfil: number = Number(input("Id do perfil: "));
        perfil = app.redeSocial.repDePerfis.consultar(idPerfil);

        //perfil = app.redeSocialPerfil.repDePerfis.consultar(idPerfil);

        postagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
        perfil.postagens.push(postagem)
        app.redeSocial.incluirPostagem(postagem)
        perfil.adicionarPostagem(postagem)
        acumulador_postagens.push(postagem)
        
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
          visualizacoesRestantes,
        );

        app.redeSocial.incluirPostagem(postagem)
        acumulador_postagens.push(postagem)
        console.log("POSTAGEM INCLUÍDA COM SUCESSO");
      }
      if (tipo_postagem == "3") {
        if (postagem instanceof PostagemAvancada) {
          console.log("\nADICIONAR HASHTAG");
          let id: number = Number(input("ID DA POSTAGEM: "));
          if (app.redeSocial.repDePostagens.consultar(id)) {
            const hashtag: string = input("HASHTAG: ");
            postagem.adicionarHashtag(hashtag);
            console.log("HASHTAG ADICIONADA");
            console.log(app.redeSocial.repDePostagens);
          }
        }
      }
      //app.redeSocial.incluirPostagem(postagem)
      //console.log(app.redeSocial.repDePostagens);
    }
    //repositorio_postagem.incluir(postagem)
  }
}

function consultarPostagens() {
  console.log("CONSULTAR POSTAGEM");
  let id: number = Number(input("ID DA POSTAGEM: "));
  let texto: string = input("TEXTO: ");

  console.log(app.redeSocial.consultarPostagens(id, texto));
  console.log(app.redeSocial.repDePostagens.consultar(id, texto))
}

function curtirPostagem() {
  let id: number = Number(input("ID DA POSTAGEM: "));
  console.log(app.redeSocial.repDePostagens.consultar(id));
  app.redeSocial.curtir(id)
  console.log("POSTAGEM CURTIDA");
  console.log(app.redeSocial.repDePostagens.consultar(id));
}

function descurtirPostagem() {
  let id: number = Number(input("ID DA POSTAGEM: "));
  app.redeSocial.descurtir(id);
  console.log(app.redeSocial.repDePostagens);
  console.log("POSTAGEM DESCURTIDA");
}

/* function decrementarVisualizacoes() {
  console.log("DECREMENTAR VIZUALIZACOES\n");
  console.log(app.redeSocial.repDePostagens);
  let id: number = Number(input("ID DA POSTAGEM: "));
  
  if (app.redeSocial.repDePostagens.consultar(id)) {
    app.redeSocial.decrementarVisualizacoes(postagem_avancada);
  }
  //postagem_avancada.
  console.log("VIZUALISAÇÃO DECREMENTADA");
  console.log(app.redeSocial.repDePostagens.consultar(id));
} */

function exibirPostagensPorPerfil() {
  console.log("EXIBIR POSTAGENS POR PERFIL");
  let id: number = Number(input("ID DO PERFIL: "));
  console.log(app.redeSocial.exibirPostagensPorPerfil(id));
}

function exibirPostagensPorHashtag() {
  console.log("EXIBIR POSTAGENS POR HASHTAG");
  let hashtag: string = input("HASHTAG: ");
  console.log(app.redeSocial.exibirPostagensPorHashtag(hashtag));
}

//variáveis para fazer o acesso ao array de objetos no método de persistência
let acumulador_perfis:Perfil[] = []
let acumulador_postagens:Postagem[] = []


let perfil: Perfil;
let postagem: Postagem;
let postagem_avancada: PostagemAvancada;

const app = new App()
app.usarOpcoes()