"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var PostagemAvancada_1 = require("./PostagemAvancada");
var RedeSocial = /** @class */ (function () {
    function RedeSocial(repPerfil, repPostagem) {
        this._repDePerfis = repPerfil;
        this._repDePostagens = repPostagem;
        //this._repDePerfis = new RepositorioDePerfis();
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
        try {
            if (!this.repDePerfis.consultar(perfil.id)) {
                this.repDePerfis.incluir(perfil);
            }
            throw new Error('O perfil com o mesmo id já existe');
        }
        catch (e) {
            console.log(e);
        }
        var _validando = this._repDePerfis.consultar(perfil.id, perfil.nome, perfil.email);
        try {
            if (_validando != null) {
                throw new Error('O perfil já existe');
                //this._repDePerfis.incluirv2(perfil);
            }
            else {
                this._repDePerfis.incluir(perfil);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    };
    RedeSocial.prototype.consultarPerfil = function (id, nome, email) {
        try {
            if (!this.repDePerfis.consultar(id, nome, email)) {
                throw new Error("Perfil não encontrado");
            }
            return this.repDePerfis.consultar(id, email, nome);
        }
        catch (e) {
            console.log(e.message);
        }
        var perfilProcurado;
        try {
            if (!this._repDePerfis.consultar(id, email, nome)) {
                throw new Error("Perfil não encontrado");
            }
            return this._repDePerfis.consultar(id, email, nome);
        }
        catch (e) {
            console.log(e.message);
        }
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        this.repDePostagens.incluir(postagem);
    };
    RedeSocial.prototype.consultarPostagens = function (id, texto, hashtag, perfil) {
        var postagem = this.repDePostagens.consultar(id, texto, hashtag, perfil);
        if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
            this.decrementarVisualizacoes(postagem);
        }
        this._repDePostagens.consultar(id, texto, hashtag, perfil);
        try {
            if (this.repDePostagens.consultar(id).length < 0) {
                throw new Error('Não foi encontrada nenhuma postagem');
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    RedeSocial.prototype.curtir = function (idPostagem) {
        var pesquisa = this.repDePostagens.consultar(idPostagem);
        try {
            for (var i = 0; i < pesquisa.length; i++) {
                if (pesquisa[i].id == idPostagem) {
                    pesquisa[i].curtir();
                }
                else {
                    throw new Error('Postagem não encontrada');
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    RedeSocial.prototype.descurtir = function (idPostagem) {
        var _pesquisa = this.repDePostagens.consultar(idPostagem);
        try {
            for (var i = 0; i < _pesquisa.length; i++) {
                if (_pesquisa[i].id == idPostagem) {
                    _pesquisa[i].descurtir();
                }
                else {
                    throw new Error("Postagem não encontrada");
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    RedeSocial.prototype.decrementarVisualizacoes = function (postagem) {
        if (this.repDePostagens.consultar(postagem.id)) {
            if (postagem.visualizacoesRestantes > 0) {
                postagem.decrementarVisualizacoes();
            }
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var postagensDoPerfil = [];
        var perfilProcurado = this.repDePerfis.consultar(id);
        if (perfilProcurado) {
        }
        //let postagens = this._repDePostagens.consultar(id);
        var postagens = this.repDePostagens.consultar(undefined, undefined, undefined, this.consultarPerfil(id));
        var atual;
        var avancada;
        var postagemConsultada = this.consultarPerfil(id);
        for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
            var postagem = postagens_1[_i];
            if (this.consultarPerfil(id)) {
                postagensDoPerfil.push(postagem);
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada && postagem.visualizacoesRestantes > 0) {
                    postagem.decrementarVisualizacoes();
                    //this.decrementarVisualizacoes(postagem)
                    postagensDoPerfil.push(postagem);
                }
            }
            return postagensDoPerfil;
        }
        try {
            if (postagensDoPerfil.length < 0) {
                throw new Error('Não foi encontrada nenhuma postagem associada ao perfil');
            }
            return postagensDoPerfil;
        }
        catch (e) {
            console.log(e.message);
        }
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        var postagens_hashtag = this.repDePostagens.consultar(undefined, undefined, hashtag, undefined);
        var postagensHashtag = [];
        for (var _i = 0, postagens_hashtag_1 = postagens_hashtag; _i < postagens_hashtag_1.length; _i++) {
            var postagem = postagens_hashtag_1[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.existeHashtag(hashtag)) {
                    this.decrementarVisualizacoes(postagem);
                    if (postagem.visualizacoesRestantes > 0) {
                        postagensHashtag.push(postagem);
                    }
                }
            }
        }
        try {
            if (postagensHashtag.length < 0) {
                throw new Error('Não foi encontrada nenhuma postagem associada ao perfil');
            }
            return postagensHashtag;
        }
        catch (e) {
            console.log(e.message);
        }
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;
