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
    measure: FrenchMeasure
}

export interface Photo {
    src: string
    alt: string
}


export enum FrenchMeasure{
    LITRE = "l",
    MILLILITRE = "ml",
    GRAMME = "g",
    SANS = ""
}