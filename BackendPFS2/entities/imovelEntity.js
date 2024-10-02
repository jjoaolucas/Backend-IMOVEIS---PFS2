import BaseEntity from "./baseEntity.js";


export default class ImovelEntity extends BaseEntity {
    #id;
    #descricao;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #valor;
    #disponivel;
    #imagens;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    get cep() {
        return this.#cep;
    }
    set cep(value) {
        this.#cep = value;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(value) {
        this.#endereco = value;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(value) {
        this.#bairro = value;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(value) {
        this.#cidade = value;
    }

    get disponivel() {
        return this.#disponivel;
    }
    set disponivel(value) {
        this.#disponivel = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#valor = value;
    }

    get imagens() {
        return this.#imagens;
    }
    set imagens(value) {
        this.#imagens = value;
    }

    constructor(id, descricao, cep, cidade, bairro, valor, disponivel, endereco, imagens) {
        super();
        this.#id = id;
        this.#descricao = descricao;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#bairro = bairro;
        this.#valor = valor;
        this.#disponivel = disponivel;
        this.#endereco = endereco;
        this.#imagens = imagens;
    }
}