"use strict";
exports.__esModule = true;
exports.RepositorioDePostagens = void 0;
var RepositorioDePostagens = /** @class */ (function () {
    function RepositorioDePostagens() {
        this._postagens = [];
    }
    Object.defineProperty(RepositorioDePostagens.prototype, "postagens", {
        get: function () {
            return this._postagens;
        },
        enumerable: false,
        configurable: true
    });
    //private postagensAvancadas:PostagemAvancada[] = []
    RepositorioDePostagens.prototype.incluir = function (postagem) {
        this._postagens.push(postagem);
        //if (!this.consultar(postagem.id, postagem.texto)){
        //}
    };
    RepositorioDePostagens.prototype.incluirv2 = function (postagem) {
        if (!this.consultar(postagem.id, postagem.texto) == null) {
            this._postagens.push(postagem);
        }
    };
    RepositorioDePostagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var postagensEncontradas = [];
        for (var index = 0; index < this.postagens.length; index++) {
            if (this.postagens[index]["_id"] == id) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
            else if (this.postagens[index]["_texto"] == texto) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
            else if (this.postagens[index]["_perfil"] == perfil) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
        }
        console.log(postagensEncontradas);
        return postagensEncontradas;
    };
    return RepositorioDePostagens;
}());
exports.RepositorioDePostagens = RepositorioDePostagens;
