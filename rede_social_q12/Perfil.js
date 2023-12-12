"use strict";
exports.__esModule = true;
exports.Perfil = void 0;
var Perfil = /** @class */ (function () {
    function Perfil(_id, _nome, _email) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
    }
    Object.defineProperty(Perfil.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Perfil;
}());
exports.Perfil = Perfil;
