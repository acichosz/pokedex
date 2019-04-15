export class Pokemon{
    artist: string = null;
    attacks: Attack [] = []​​​;
    convertedRetreatCost: number = null;
    ​​​hp: number = null;
    id: string = null;
    imageUrl: string = null;
    imageUrlHiRes: string = null;
    name: string = null;
    nationalPokedexNumber: number = null;
    number: number = null;
    rarity: string = null;
    retreatCost: string[] = []​;​​
    series: string = null;
    set: string = null;
    setCode: string = null;
    subtype: string = null;
    supertype: string = null;
    types: string[] = [];
    weaknesses: Weakness[] =[]
}
export class Attack{
    cost: string [] = [];
    name: string = null;
    text: string = null;
    damage: string = null
    convertedEnergyCost: number = null;
}
export class Weakness{
    type: string = null;
    value: string = null;
}
export class Page{
    cards: Pokemon[]= [];
}

export class Card{
    card = new Pokemon();
}