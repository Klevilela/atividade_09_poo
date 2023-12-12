"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PostagemAvancada = void 0;
var Postagem_1 = require("./Postagem");
var PostagemAvancada = /** @class */ (function (_super) {
    __extends(PostagemAvancada, _super);
    function PostagemAvancada(_id, _texto, _curtidas, _descurtidas, _date, _perfil, _visualizacoesRestantes) {
        var _this = _super.call(this, _id, _texto, _curtidas, _descurtidas, _date, _perfil) || this;
        _this._hashtags = [];
        _this._visualizacoesRestantes = _visualizacoesRestantes;
        return _this;
        //this._hashtags = this._hashtags
    }
    Object.defineProperty(PostagemAvancada.prototype, "hashtags", {
        get: function () {
            return this._hashtags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PostagemAvancada.prototype, "visualizacoesRestantes", {
        get: function () {
            return this._visualizacoesRestantes;
        },
        enumerable: false,
        configurable: true
    });
    /*get vizualizacoes_restantes(){
      return this._vizualizacoesRestantes
    }*/
    PostagemAvancada.prototype.adicionarHashtag = function (hashtag) {
        this._hashtags.push(hashtag);
    };
    PostagemAvancada.prototype.existeHashtag = function (hashTag) {
        var achou = false;
        for (var _i = 0, _a = this._hashtags; _i < _a.length; _i++) {
            var hashtag = _a[_i];
            if (hashtag == hashTag) {
                achou = true;
            }
        }
        return achou;
    };
    PostagemAvancada.prototype.decrementarVisualizacoes = function () {
        if (this.visualizacoesRestantes > 0) { }
        this._visualizacoesRestantes--;
    };
    return PostagemAvancada;
}(Postagem_1.Postagem));
exports.PostagemAvancada = PostagemAvancada;
