export class Recipe{
    public photo: Photo
    
    constructor(public name: string,
                public ingredients: Ingredient[],
                public instructions: string[]){

    }
}

export interface Ingredient{
    name: string
    quantity: number
}

export interface Photo {
    src: string
    alt: string
}