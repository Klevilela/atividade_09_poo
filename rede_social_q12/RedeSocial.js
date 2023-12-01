"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
var RepositorioDePerfis_1 = require("./RepositorioDePerfis");
var RepositorioDePostagens_1 = require("./RepositorioDePostagens");
var PostagemAvancada_1 = require("./PostagemAvancada");
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
        this._repDePerfis = new RepositorioDePerfis_1.RepositorioDePerfis();
        this._repDePostagens = new RepositorioDePostagens_1.RepositorioDePostagens();
    }
    Object.defineProperty(RedeSocial.prototype, "repDePerfis", {
        get: function () {
            return this._repDePerfis;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RedeSocial.prototype, "repDePostagens", {
        get: function () {
            return this._repDePostagens;
        },
        enumerable: false,
        configurable: true
    });
    RedeSocial.prototype.incluirPerfil = function (perfil) {
        var _validando = this._repDePerfis.consultar(perfil.id, perfil.nome, perfil.email);
        if (_validando == null) {
            this._repDePerfis.incluir(perfil);
            //this._repDePerfis.incluirv2(perfil);
        }
    };
    RedeSocial.prototype.consultarPerfil = function (id, nome, email) {
        return this._repDePerfis.consultar(id, email, nome);
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        this.repDePostagens.incluir(postagem);
        //this.repDePostagens.incluirv2(postagem)
        /*if (postagem instanceof Postagem){
                let  _validando = this._repDePostagens.consultar(postagem.id, postagem.texto);
                for (let i = 0; i < this._repDePostagens.postagens.length; i++) {
                    if (_validando == null){
                        this._repDePostagens.incluir(postagem)
                    }
                }
            }
            if (postagem.texto != null && postagem.id != null && postagem.perfil != null){
                //let  _validando = this._repDePostagens.consultar(postagem.id, postagem.texto);
                
                if (this._repDePostagens.postagens.length == 0){
                    this._repDePostagens.incluir(postagem)
                }
                
                for (let i = 0; i < this._repDePostagens.postagens.length; i++) {
                    /*if (!this._repDePostagens.consultar(postagem.id)){
                        this._repDePostagens.incluir(postagem)
                    }
                    if (this._repDePostagens.postagens[i].id != postagem.id){
                        this._repDePostagens.incluir(postagem)
                    }
                }
                */
        /*for (let post of this._repDePostagens.postagens) {
                if (!this._repDePostagens.consultar(post.id, post.texto)){
                    this._repDePostagens.incluir(postagem)
                }
            }*/
        /*if (!this._repDePostagens.consultar(postagem.id, postagem.texto)){
                this._repDePostagens.incluir(postagem)
            }*/
    };
    RedeSocial.prototype.consultarPostagens = function (id, texto, hashtag, perfil) {
        this._repDePostagens.consultar(id, texto, hashtag, perfil);
    };
    RedeSocial.prototype.curtir = function (idPostagem) {
        var pesquisa = this._repDePostagens.postagens;
        for (var i = 0; i < pesquisa.length; i++) {
            if (pesquisa[i].id == idPostagem) {
                pesquisa[i].curtir();
            }
        }
    };
    RedeSocial.prototype.descurtir = function (idPostagem) {
        var _pesquisa = this._repDePostagens.postagens;
        for (var i = 0; i < _pesquisa.length; i++) {
            if (_pesquisa[i].id == idPostagem) {
                _pesquisa[i].descurtir();
            }
        }
    };
    RedeSocial.prototype.decrementarVisualizacoes = function (postagem) {
        if (postagem.visualizacoesRestantes > 0) {
            postagem.decrementarVisualizacoes();
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var postagensDoPerfil = [];
        var postagens = this._repDePostagens.postagens;
        var atual;
        var avancada;
        for (var i = 0; i < postagens.length; i++) {
            if (postagens[i].id == id) {
                if (postagens[i] instanceof PostagemAvancada_1.PostagemAvancada) {
                    avancada = postagens[i];
                    this.decrementarVisualizacoes(avancada);
                    if (avancada.visualizacoesRestantes > 0) {
                        postagensDoPerfil.push(avancada);
                    }
                }
                atual = postagens[i];
                postagensDoPerfil.push(atual);
            }
        }
        return postagensDoPerfil;
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        var postagensHashtag = [];
        var postagens = this._repDePostagens.postagens;
        var avancada;
        /* for (let i = 0; i < postagens.length; i++) {
          if (postagens[i] instanceof PostagemAvancada) {
            if (postagens[i] instanceof PostagemAvancada) {
              avancada = <PostagemAvancada>postagens[i];
              if (avancada.existeHashtag(hashtag)) {
                this.decrementarVisualizacoes(avancada);
                if (avancada.visualizacoesRestantes > 0) {
                  postagensHashtag.push(avancada);
                }
              }
            }
          }
        } */
        for (var _i = 0, _a = this.repDePostagens.postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.existeHashtag(hashtag)) {
                    this.decrementarVisualizacoes(postagem);
                    if (postagem.visualizacoesRestantes > 0) {
                        postagensHashtag.push(postagem);
                    }
                }
            }
            return postagensHashtag;
        }
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;
