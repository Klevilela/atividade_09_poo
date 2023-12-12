"use strict";
exports.__esModule = true;
exports.Postagem = void 0;
var Postagem = /** @class */ (function () {
    function Postagem(_id, _texto, _curtidas, _descurtidas, _date, _perfil) {
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _curtidas;
        this._descurtidas = _descurtidas;
        this._date = _date;
        this._perfil = _perfil;
    }
    ;
    Object.defineProperty(Postagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "texto", {
        get: function () {
            return this._texto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "curtidas", {
        get: function () {
            return this._curtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "descurtidas", {
        get: function () {
            return this._descurtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "perfil", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Postagem.prototype.curtir = function () {
        this._curtidas++;
    };
    Postagem.prototype.descurtir = function () {
        this._descurtidas++;
    };
    Postagem.prototype.ehPopular = function () {
        return this.curtidas >= 0.5 * this.descurtidas;
    };
    return Postagem;
}());
exports.Postagem = Postagem;
