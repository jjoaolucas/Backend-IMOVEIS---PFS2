

export default class ImovelErro extends Error {

    #insertImovel;
    #insertImages;

    get insertImovel() {
        return this.#insertImovel;
    }
    set insertImovel(value) {
        this.#insertImovel = value;
    }

    get insertImages() {
        return this.#insertImages;
    }
    set insertImages(value) {
        this.#insertImages = value;
    }

    constructor(insertImovel, insertImages, message){
        super(message);
        this.#insertImovel = insertImovel;
        this.#insertImages = insertImages;
    }
}