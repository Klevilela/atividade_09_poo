"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var RedeSocial_1 = require("./RedeSocial");
var Perfil_1 = require("./Perfil");
var Postagem_1 = require("./Postagem");
var PostagemAvancada_1 = require("./PostagemAvancada");
var RepositorioDePerfis_1 = require("./RepositorioDePerfis");
var RepositorioDePostagens_1 = require("./RepositorioDePostagens");
var fs = require("fs");
//import { incluirPerfil } from "./FuncionalidadesApp";
var prompt = require("prompt-sync");
var input = prompt();
var INCLUIR_PERFIL = "1";
var CONSULTAR_PERFIL = "2";
var INCLUIR_POSTAGEM = "3";
var CONSULTAR_POSTAGEM = "4";
var CURTIR = "5";
var DESCURTIR = "6";
var DECREMENTAR_VIZUALIZACOES = "7";
var EXIBIR_POSTAGENS_POR_PERFIL = "8";
var EXIBIR_POSTAGENS_POR_HASHTAG = "9";
var SAIR = "0";
var App = /** @class */ (function () {
  function App(redeSocial) {
    this._redeSocial = redeSocial;
  }
  Object.defineProperty(App.prototype, "redeSocial", {
    get: function () {
      return this._redeSocial;
    },
    enumerable: false,
    configurable: true,
  });
  App.prototype.carregarPerfildeArquivo = function () {
    var arquivo = fs.readFileSync("Perfis.txt", "utf-8");
    var linhas = arquivo.split("\n");
    var perfis = "PERFIS CARREGADOS\n";
    for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
      var linha = linhas_1[_i];
      var id = linha.split(";")[0];
      var nome = linha.split(";")[1];
      var email = linha.split(";")[2];
      perfis += "Id: "
        .concat(id, "  - Nome: ")
        .concat(nome, " - Email: ")
        .concat(email, "\n");
    }
    return perfis;
  };
  App.prototype.carregarPostagensdeArquivo = function () {
    var arquivo = fs.readFileSync("Postagens.txt", "utf-8");
    var linhas = arquivo.split("\n");
    var postagens_carregadas = "POSTAGENS CARREGADAS\n";
    for (var _i = 0, linhas_2 = linhas; _i < linhas_2.length; _i++) {
      var linha = linhas_2[_i];
      var atrib_linha = linha.split(";");
      var id = atrib_linha[0];
      var tipo_postagem =
        atrib_linha.length > 6 ? "PostagemAvancada" : "Postagem";
      var texto = atrib_linha[1];
      var curtidas = atrib_linha[2];
      var descurtidas = atrib_linha[3];
      var data = atrib_linha[4];
      var perfil_1 = atrib_linha[5];
      //let perfil = linha.split(';')[6]
      //let str_perfil = JSON.parse(perfil)
      //let id = linha.split(';')[0]
      if (tipo_postagem === "Postagem") {
        postagens_carregadas += "\nId: "
          .concat(id, "\nTexto: ")
          .concat(texto, "\nCurtidas: ")
          .concat(curtidas, "\nDescurtidas: ")
          .concat(descurtidas, "\nData de publica\u00E7\u00E3o: ")
          .concat(data, "\nPerfil: ")
          .concat(perfil_1, "\n");
      }
      if (tipo_postagem === "PostagemAvancada") {
        //let hashtag = linha.split(';')[7]
        //let visualizacoes_restantes = atrib_linha[5]
        var visualizacoes_restantes = atrib_linha[6];
        var linha_postagem_avancada =
          "Visualiza\u00E7\u00F5es Restantes: ".concat(
            visualizacoes_restantes,
            "\n"
          );
        postagens_carregadas += "\nId: "
          .concat(id, "\nTexto: ")
          .concat(texto, "\nCurtidas: ")
          .concat(curtidas, "\nDescurtidas: ")
          .concat(descurtidas, "\nData de publica\u00E7\u00E3o: ")
          .concat(data, "\nPerfil: ")
          .concat(perfil_1, "\nVisualiza\u00E7\u00F5es restantes: ")
          .concat(visualizacoes_restantes, "\n");
        postagens_carregadas += linha_postagem_avancada;
      }
    }
    console.log(linhas[8].split(";")[6]);
    return postagens_carregadas;
  };
  App.prototype.gravarPerfis = function () {
    console.log("CADASTRANDO PERFIS");
    var linha_perfil = "";
    var linhas_perfis = "";
    var perfis_cadastrados = this.redeSocial.repDePerfis.repDePerfis;
    for (
      var _i = 0, perfis_cadastrados_1 = perfis_cadastrados;
      _i < perfis_cadastrados_1.length;
      _i++
    ) {
      var perfil_2 = perfis_cadastrados_1[_i];
      linha_perfil += ""
        .concat(perfil_2.id, ";")
        .concat(perfil_2.nome, ";")
        .concat(perfil_2.email, "\n");
      linhas_perfis += linha_perfil;
    }
    //linhas_perfis = linhas_perfis.slice(0, linhas_perfis.length)
    fs.writeFileSync("Perfis.txt", linhas_perfis, { flag: "a" });
  };
  App.prototype.gravarPostagens = function () {
    console.log("POSTAGENS CARREGADAS");
    var linha_postagem = "";
    var linhas_postagens = "";
    var postagens_carregadas = this.redeSocial.repDePostagens.postagens;
    for (
      var _i = 0, postagens_carregadas_1 = postagens_carregadas;
      _i < postagens_carregadas_1.length;
      _i++
    ) {
      var post = postagens_carregadas_1[_i];
      linha_postagem += ""
        .concat(post.id, ";")
        .concat(post.texto, ";")
        .concat(post.curtidas, ";")
        .concat(post.descurtidas, ";")
        .concat(post.date, ";")
        .concat(post.perfil, ";\n");
      linhas_postagens += linha_postagem;
      if (post instanceof PostagemAvancada_1.PostagemAvancada) {
        linha_postagem += ""
          .concat(post.id, ";")
          .concat(post.texto, ";")
          .concat(post.curtidas, ";")
          .concat(post.descurtidas, ";")
          .concat(post.date, ";")
          .concat(post.perfil, ";")
          .concat(post.visualizacoesRestantes, ";")
          .concat(post.hashtags, "\n"); //${post.hashtags}
        linhas_postagens += linha_postagem;
      }
    }
    fs.writeFileSync("Postagens.txt", linhas_postagens, { flag: "a" });
  };
  App.prototype.exibirMenu = function () {
    var menu = "";
    menu += "\nREDE SOCIAL\n\n";
    menu += "1- INCLUIR PERFIL\n";
    menu += "2- CONSULTAR PERFIL\n";
    menu += "3- INCLUIR POSTAGEM\n";
    menu += "4- CONSULTAR POSTAGEM\n";
    menu += "5- CURTIR POSTAGEM\n";
    menu += "6- DESCURTIR POSTAGEM\n";
    menu += "7- DECREMENTAR VISUALIZA\u00C7\u00D5ES\n";
    menu += "8- EXIBIR POSTAGENS POR PERFIL\n";
    menu += "9- EXIBIR POSTAGENS POR HASHTAG\n";
    menu += "\n0-SAIR";
    console.log(menu);
  };
  App.prototype.usarOpcoes = function () {
    var opcao;
    //app.gravarPerfis()
    do {
      var enter_to_continue = input("Aperter <enter> para continuar");
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
  };
  return App;
})();
exports.App = App;
//const nome = input('Nome: ')
function incluirPerfil() {
  //let redeSocial:RedeSocial
  console.log("INCLUIR PERFIL\n");
  var id = Number(input("ID: "));
  var nome = input("NOME: ");
  var email = input("EMAIL: ");
  perfil = new Perfil_1.Perfil(id, nome, email);
  if (
    rede_social.repDePerfis instanceof RepositorioDePerfis_1.RepositorioDePerfis
  ) {
    //repositorio_perfis.incluir(perfil)
    rede_social.incluirPerfil(perfil);
  }
  console.log("PERFIL INCLUÍDO COM SUCESSO");
  console.log(rede_social.repDePerfis);
}
function consultarPerfil() {
  console.log("CONSULTAR PERFIL");
  var id = Number(input("ID: "));
  var nome = input("NOME: ");
  var email = input("EMAIL: ");
  if (
    rede_social.repDePerfis instanceof RepositorioDePerfis_1.RepositorioDePerfis
  ) {
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
  var tipo_postagem = input("TIPO: ");
  var idPerfil;
  idPerfil = Number(input("INFORME A ID DO PERIL: "));
  if (rede_social.consultarPerfil(idPerfil)) {
    if (
      rede_social.repDePostagens instanceof
      RepositorioDePostagens_1.RepositorioDePostagens
    ) {
      if (tipo_postagem == "1") {
        var id = Number(input("ID DA POSTAGEM: "));
        var texto = input("TEXTO DA POSTAGEM: ");
        var curtidas = Number(input("CURTIDAS: "));
        var descurtidas = Number(input("DESCURTIDAS: "));
        var data_postagem = input(
          "DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): "
        );
        var data = new Date(data_postagem);
        var perfil_3;
        var idPerfil_1 = Number(input("Id do perfil: "));
        perfil_3 = rede_social.repDePerfis.consultar(idPerfil_1);
        perfil_3 = rede_social.repDePerfis.consultar(idPerfil_1);
        postagem = new Postagem_1.Postagem(
          id,
          texto,
          curtidas,
          descurtidas,
          data,
          perfil_3
        );
        console.log("POSTAGEM INCLUÍDA COM SUCESSO");
        if (postagem.ehPopular()) {
          console.log("\nA POSTAGEM É POPULAR");
        } else {
          console.log("\nA POSTAGEM NÃO É POPULAR");
        }
      }
      if (tipo_postagem == "2") {
        var id = Number(input("ID DA POSTAGEM: "));
        var texto = input("TEXTO DA POSTAGEM: ");
        var curtidas = Number(input("CURTIDAS: "));
        var descurtidas = Number(input("DESCURTIDAS: "));
        var data_postagem = input(
          "DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): "
        );
        var data = new Date(data_postagem);
        var visualizacoesRestantes = Number(input("VISUALIZAÇÕES RESTANTES: "));
        postagem = new PostagemAvancada_1.PostagemAvancada(
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
        if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
          console.log("\nADICIONAR HASHTAG");
          var id = Number(input("ID DA POSTAGEM: "));
          if (rede_social.repDePostagens.consultar(id)) {
            var hashtag = input("HASHTAG: ");
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
  var id = Number(input("ID DA POSTAGEM: "));
  var texto = input("TEXTO: ");
  var hashtag = input("HASHTAG: ");
  //if (rede_social instanceof PostagemAvancada)
  //console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil))
  if (rede_social.repDePostagens instanceof Postagem_1.Postagem) {
    console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil));
    console.log(typeof id);
  }
  console.log(rede_social.consultarPostagens(id, texto));
}
function curtirPostagem() {
  var id = Number(input("ID DA POSTAGEM: "));
  rede_social.curtir(id);
  console.log("POSTAGEM CURTIDA");
  console.log(rede_social.repDePostagens.postagens);
}
function descurtirPostagem() {
  var id = Number(input("ID DA POSTAGEM: "));
  rede_social.descurtir(id);
  console.log(rede_social.repDePostagens.postagens);
  console.log("POSTAGEM DESCURTIDA");
  //rede_social.descurtir(id)
  //console.log('POSTAGEM DESCURTIDA')
}
function decrementarVisualizacoes() {
  console.log("DECREMENTAR VIZUALIZACOES\n");
  console.log(rede_social.repDePostagens.postagens);
  var id = Number(input("ID DA POSTAGEM: "));
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
  var id = Number(input("ID DO PERFIL"));
  console.log(rede_social.exibirPostagensPorPerfil(id));
}
function exibirPostagensPorHashtag() {
  console.log("EXIBIR POSTAGENS POR PERFIL");
  var hashtag = input("HASHTAG: ");
  if (
    rede_social.repDePostagens.postagens instanceof
    PostagemAvancada_1.PostagemAvancada
  ) {
    rede_social.exibirPostagensPorHashtag(hashtag);
  }
  console.log(rede_social.exibirPostagensPorHashtag(hashtag));
}
var perfil;
var postagem;
var postagem_avancada;
//let perfis:Perfil[] = []
//let postagens:Postagem[] = []
//let repositorio_perfis = new RepositorioDePerfis()
//
var repositorio_postagem =
  new RepositorioDePostagens_1.RepositorioDePostagens();
var rede_social = new RedeSocial_1.RedeSocial();
var app = new App(rede_social);
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
