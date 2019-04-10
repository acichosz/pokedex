export class Pokemon{
    artist: string = null;
    // attacks: Array [ {…}, {…} ]​​​;
    convertedRetreatCost: number = null;
    ​​​hp: number = null;
    id: string = null;
    imageUrl: string = null;
    imageUrlHiRes: string = null;
    name: string = null;
    nationalPokedexNumber: number = null;
    number: number = null;
    rarity: string = null;
    // resistances: Array [ {…} ]​​​
    // retreatCost: Array [ "Colorless" ]​​​
    series: string = null;
    set: string = null;
    setCode: string = null;
    subtype: string = null;
    supertype: string = null;
    // types: Array [ "Fighting" ]​​​
    // weaknesses: (1) […
}

export class Page{
    cards: Pokemon[]
}

export class Card{
    card: Pokemon[]
}