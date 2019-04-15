import { Component} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Card, Pokemon } from '../models';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  pokemon = new Card();
  similarPokemons: Pokemon [] = [];
  typeFilter: string = '';
  rarityFilter: string = '';
  hpMinFilter: string = '';

  constructor(
    private pokemonService: PokemonService,
  ) { }


  async setPokemon(id: string){
    this.pokemonService.spinnerStart();
    try {
      this.pokemon = await this.pokemonService.getPokemonById(id);
      await this.setSimilarPokemons();
      this.clearFilters();
      this.pokemonService.spinnerStop();
    }
    catch (error)
    {
      this.pokemonService.spinnerStop();
    }
  }

  async setSimilarPokemons(){
    let hpMax: number = 1.1 * this.pokemon.card.hp;
    this.setFiltersForSimilarPokemons();
    try {
      let result: any = await this.pokemonService.getPokemons(0, 20, this.rarityFilter, this.typeFilter, this.hpMinFilter);
      // Logical operators don't work wit HP filter, so there were set only hp min filter. Hp max is included below
      let allSimilarPokemons: Pokemon[] = result.body.cards.filter(pokemon => (this.pokemon.card.id !== pokemon.id && pokemon.hp<hpMax));
      this.similarPokemons = this.drawSimilarPokemons(allSimilarPokemons);
    } 
    catch (error) {
    }
  }

  setFiltersForSimilarPokemons(){
    this.pokemon.card.types.forEach(element => {
      this.typeFilter += element + '|';
    });
    this.rarityFilter= this.pokemon.card.rarity;
    this.hpMinFilter = 'gte' + (0.9 * this.pokemon.card.hp).toString();
  }

  drawSimilarPokemons(pokemons: Pokemon[]): Pokemon[]{
    let drawnPokemons: Pokemon[] = [];
    for (let i = 0; i <3; i++) {
      if(pokemons.length !== 0){
        let randomIndex: number = Math.floor(Math.random() * pokemons.length);
        drawnPokemons.push(pokemons[randomIndex]);
        pokemons.splice(randomIndex, 1);
      }
    }
    return drawnPokemons;
  }

  async changePokemon(pokemonId: string){
    await this.setPokemon(pokemonId);
  }

  clearFilters(){
    this.rarityFilter = '';
    this.typeFilter = '';
    this.hpMinFilter = '';
  }
}
