"use strict";
exports.__esModule = true;
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
//const DECREMENTAR_VIZUALIZACOES: string = "7";
var EXIBIR_POSTAGENS_POR_PERFIL = "7";
var EXIBIR_POSTAGENS_POR_HASHTAG = "8";
var SAIR = "0";
var App = /** @class */ (function () {
    /* constructor(redeSocial: RedeSocial) {
      this._redeSocial = redeSocial;
    } */
    function App() {
        this._redeSocial = new RedeSocial_1.RedeSocial(new RepositorioDePerfis_1.RepositorioDePerfis(), new RepositorioDePostagens_1.RepositorioDePostagens());
        //this._redeSocial2 = new RedeSocial(new RepositorioDePostagens());
    }
    Object.defineProperty(App.prototype, "redeSocial", {
        get: function () {
            return this._redeSocial;
        },
        enumerable: false,
        configurable: true
    });
    /* get redeSocialPostagem(){
      return this._redeSocial2
    } */
    App.prototype.carregarPerfildeArquivo = function () {
        var arquivo = fs.readFileSync("Perfis.txt", "utf-8");
        var linhas = arquivo.split("\n");
        var perfis = "PERFIS CARREGADOS\n";
        for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
            var linha = linhas_1[_i];
            var id = linha.split(";")[0];
            var nome = linha.split(";")[1];
            var email = linha.split(";")[2];
            perfis += "Id: ".concat(id, "  - Nome: ").concat(nome, " - Email: ").concat(email, "\n");
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
            var tipo_postagem = atrib_linha.length > 6 ? "PostagemAvancada" : "Postagem";
            var texto = atrib_linha[1];
            var curtidas = atrib_linha[2];
            var descurtidas = atrib_linha[3];
            var data = atrib_linha[4];
            var perfil_1 = atrib_linha[5];
            //let perfil = linha.split(';')[6]
            //let str_perfil = JSON.parse(perfil)
            //let id = linha.split(';')[0]
            if (tipo_postagem === "Postagem") {
                postagens_carregadas += "\nId: ".concat(id, "\nTexto: ").concat(texto, "\nCurtidas: ").concat(curtidas, "\nDescurtidas: ").concat(descurtidas, "\nData de publica\u00E7\u00E3o: ").concat(data, "\nPerfil: ").concat(perfil_1, "\n");
            }
            if (tipo_postagem === "PostagemAvancada") {
                //let hashtag = linha.split(';')[7]
                //let visualizacoes_restantes = atrib_linha[5]
                var visualizacoes_restantes = atrib_linha[6];
                var linha_postagem_avancada = "Visualiza\u00E7\u00F5es Restantes: ".concat(visualizacoes_restantes, "\n");
                postagens_carregadas += "\nId: ".concat(id, "\nTexto: ").concat(texto, "\nCurtidas: ").concat(curtidas, "\nDescurtidas: ").concat(descurtidas, "\nData de publica\u00E7\u00E3o: ").concat(data, "\nPerfil: ").concat(perfil_1, "\nVisualiza\u00E7\u00F5es restantes: ").concat(visualizacoes_restantes, "\n");
                postagens_carregadas += linha_postagem_avancada;
            }
        }
        console.log(linhas[8].split(";")[6]);
        return postagens_carregadas;
    };
    App.prototype.gravarPerfis = function () {
        console.log("CADASTRANDO PERFIS...");
        var linha_perfil = "";
        var linhas_perfis = "";
        for (var _i = 0, acumulador_perfis_1 = acumulador_perfis; _i < acumulador_perfis_1.length; _i++) {
            var perfil_2 = acumulador_perfis_1[_i];
            linha_perfil += "".concat(perfil_2.id, ";").concat(perfil_2.nome, ";").concat(perfil_2.email, "\n");
            linhas_perfis += linha_perfil;
        }
        fs.writeFileSync("Perfis.txt", linhas_perfis, { flag: "a" });
    };
    App.prototype.gravarPostagens = function () {
        console.log("CADASTRANDO POSTAGENS...");
        var linha_postagem = "";
        var linhas_postagens = "";
        for (var _i = 0, acumulador_postagens_1 = acumulador_postagens; _i < acumulador_postagens_1.length; _i++) {
            var post = acumulador_postagens_1[_i];
            linha_postagem += "".concat(post.id, ";").concat(post.texto, ";").concat(post.curtidas, ";").concat(post.descurtidas, ";").concat(post.date, "\n");
            linhas_postagens += linha_postagem;
            if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                linha_postagem += "".concat(post.id, ";").concat(post.texto, ";").concat(post.curtidas, ";").concat(post.descurtidas, ";").concat(post.date, ";").concat(post.perfil, ";").concat(post.visualizacoesRestantes, ";").concat(post.hashtags, "\n"); //${post.hashtags}
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
        menu += "7- EXIBIR POSTAGENS POR PERFIL\n";
        menu += "8- EXIBIR POSTAGENS POR HASHTAG\n";
        menu += "\n0-SAIR";
        console.log(menu);
    };
    App.prototype.usarOpcoes = function () {
        do {
            try {
                //console.log(this.carregarPerfildeArquivo())
                //console.log(this.carregarPostagensdeArquivo())
                var enter_to_continue = input("Aperter <enter> para continuar");
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
                    case EXIBIR_POSTAGENS_POR_PERFIL:
                        exibirPostagensPorPerfil();
                        break;
                    case EXIBIR_POSTAGENS_POR_HASHTAG:
                        exibirPostagensPorHashtag();
                        break;
                }
            }
            catch (e) {
                console.log(e.message);
            }
        } while (opcao != SAIR);
        console.log("APLICACAO ENCERRADA");
        if (opcao_persistencia == "1") {
            app.gravarPerfis();
            app.gravarPostagens();
        }
    };
    return App;
}());
exports.App = App;
function incluirPerfil() {
    console.log("INCLUIR PERFIL\n");
    var id = Number(input("ID: "));
    var nome = input("NOME: ");
    var email = input("EMAIL: ");
    perfil = new Perfil_1.Perfil(id, nome, email);
    if (app.redeSocial.repDePerfis instanceof RepositorioDePerfis_1.RepositorioDePerfis) {
        app.redeSocial.incluirPerfil(perfil);
        acumulador_perfis.push(perfil);
    }
    console.log("PERFIL INCLUÍDO COM SUCESSO");
    console.log(app.redeSocial.repDePerfis);
}
function consultarPerfil() {
    console.log("CONSULTAR PERFIL");
    var id = Number(input("ID: "));
    var nome = input("NOME: ");
    var email = input("EMAIL: ");
    if (app.redeSocial.repDePerfis instanceof RepositorioDePerfis_1.RepositorioDePerfis) {
        //console.log(app.redeSocial.repDePerfis.consultar(id,nome, email));
        console.log(app.redeSocial.consultarPerfil(id, nome, email));
    }
}
function incluirPostagem() {
    console.log("\nINCLUIR POSTAGEM\n");
    console.log("TIPO DE POSTAGEM\n1-POSTAGEM NORMAL\n2-POSTAGEM AVANÇADA\n3-INCLUIR HASHTAG\n");
    var tipo_postagem = input("TIPO: ");
    var idPerfil;
    idPerfil = Number(input("INFORME A ID DO PERIL: "));
    if (app.redeSocial.repDePerfis.consultar(idPerfil)) {
        console.log(app.redeSocial.consultarPerfil(idPerfil));
        if (app.redeSocial.repDePostagens instanceof RepositorioDePostagens_1.RepositorioDePostagens) {
            if (tipo_postagem == "1") {
                var id = Number(input("ID DA POSTAGEM: "));
                var texto = input("TEXTO DA POSTAGEM: ");
                var curtidas = Number(input("CURTIDAS: "));
                var descurtidas = Number(input("DESCURTIDAS: "));
                var data_postagem = input("DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): ");
                var data = new Date(data_postagem);
                var perfil_3;
                //let idPerfil: number = Number(input("Id do perfil: "));
                perfil_3 = app.redeSocial.repDePerfis.consultar(idPerfil);
                //perfil = app.redeSocialPerfil.repDePerfis.consultar(idPerfil);
                postagem = new Postagem_1.Postagem(id, texto, curtidas, descurtidas, data, perfil_3);
                perfil_3.postagens.push(postagem);
                app.redeSocial.incluirPostagem(postagem);
                perfil_3.adicionarPostagem(postagem);
                acumulador_postagens.push(postagem);
                console.log("POSTAGEM INCLUÍDA COM SUCESSO");
                if (postagem.ehPopular()) {
                    console.log("\nA POSTAGEM É POPULAR");
                }
                else {
                    console.log("\nA POSTAGEM NÃO É POPULAR");
                }
            }
            if (tipo_postagem == "2") {
                var id = Number(input("ID DA POSTAGEM: "));
                var texto = input("TEXTO DA POSTAGEM: ");
                var curtidas = Number(input("CURTIDAS: "));
                var descurtidas = Number(input("DESCURTIDAS: "));
                var data_postagem = input("DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): ");
                var data = new Date(data_postagem);
                var visualizacoesRestantes = Number(input("VISUALIZAÇÕES RESTANTES: "));
                postagem = new PostagemAvancada_1.PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, visualizacoesRestantes);
                app.redeSocial.incluirPostagem(postagem);
                acumulador_postagens.push(postagem);
                console.log("POSTAGEM INCLUÍDA COM SUCESSO");
            }
            if (tipo_postagem == "3") {
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    console.log("\nADICIONAR HASHTAG");
                    var id = Number(input("ID DA POSTAGEM: "));
                    if (app.redeSocial.repDePostagens.consultar(id)) {
                        var hashtag = input("HASHTAG: ");
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
    var id = Number(input("ID DA POSTAGEM: "));
    var texto = input("TEXTO: ");
    console.log(app.redeSocial.consultarPostagens(id, texto));
    console.log(app.redeSocial.repDePostagens.consultar(id, texto));
}
function curtirPostagem() {
    var id = Number(input("ID DA POSTAGEM: "));
    console.log(app.redeSocial.repDePostagens.consultar(id));
    app.redeSocial.curtir(id);
    console.log("POSTAGEM CURTIDA");
    console.log(app.redeSocial.repDePostagens.consultar(id));
}
function descurtirPostagem() {
    var id = Number(input("ID DA POSTAGEM: "));
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
    var id = Number(input("ID DO PERFIL: "));
    console.log(app.redeSocial.exibirPostagensPorPerfil(id));
}
function exibirPostagensPorHashtag() {
    console.log("EXIBIR POSTAGENS POR HASHTAG");
    var hashtag = input("HASHTAG: ");
    console.log(app.redeSocial.exibirPostagensPorHashtag(hashtag));
}
//variáveis para fazer o acesso ao array de objetos no método de persistência
var acumulador_perfis = [];
var acumulador_postagens = [];
var opcao;
var perfil;
var postagem;
var postagem_avancada;
var opcao_persistencia;
console.log("DESEJA GRAVAR OS DADOS NO ARQUIVO ?\n1-SIM \n2-NÃO\n");
opcao_persistencia = input(">>");
var app = new App();
app.usarOpcoes();
