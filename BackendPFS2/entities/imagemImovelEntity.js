import BaseEntity from "./baseEntity.js";


export default class ImagemImovelEntity extends BaseEntity {

    #id;
    #blob;
    #tipo;
    #imovel;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get tipo() {
        return this.#tipo;
    }
    set tipo(value) {
        this.#tipo = value;
    }

    get blob() {
        return this.#blob;
    }
    set blob(value) {
        if(this.#tipo == "") {
            throw new Error("Tipo da imagem não definido na entidade!");
        }
        if(this.#tipo == "png" || 
           this.#tipo == "jpg" || 
           this.#tipo == "jpeg" || 
           this.#tipo == "gif" || 
           this.#tipo == "webp") {
            this.#blob = value;
        } 
        else
            throw new Error("Tipo do arquivo enviado é incompatível!");
    }

    get imovel() {
        return this.#imovel;
    }
    set imovel(value) {
        this.#imovel = value;
    }

    constructor(id, blob, tipo, imovel) {
        super();
        this.#id = id;
        this.#tipo = tipo;
        this.#blob = blob;
        this.#imovel = imovel;
    }
}