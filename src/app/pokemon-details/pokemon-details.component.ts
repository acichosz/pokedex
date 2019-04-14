import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, Page, Pokemon } from '../models';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon = new Card();
  similarPokemons: Pokemon [] = [];
  typeFilter: string = '';
  rarityFilter: string = '';
  
  @Output() similarPokemonClicked = new EventEmitter();

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
  ) { }

  async ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== null){
      await this.getPokemon(id);
    }
  }

  async getPokemon(id: string){
    this.pokemonService.spinnerStart();
    try {
      this.pokemon = await this.pokemonService.getPokemonById(id);
      this.setFiltersForSimilarPokemons();
      await this.getSimilarPokemons();
      this.clearFilters();
      this.pokemonService.spinnerStop();
    }
    catch (error)
    {
      this.pokemonService.spinnerStop();
    }
  }
  setFiltersForSimilarPokemons(){
    this.pokemon.card.types.forEach(element => {
      this.typeFilter += element + ','
    });
    this.rarityFilter= this.pokemon.card.rarity;
  }
  clearFilters(){
    this.rarityFilter = '';
    this.typeFilter = '';
  }

  async getSimilarPokemons(){
    this.similarPokemons = [];
    try {
      var result: Page = await this.pokemonService.getPokemons(0, 20, this.rarityFilter, this.typeFilter);
        result.cards.forEach(card => {
          if(this.isHpValueSimilar(card.hp) && this.similarPokemons.length < 3 && this.pokemon.card.id !== card.id){
            this.similarPokemons.push(card);
          }
        });
    } 
    catch (error) {
    }
  }

  isHpValueSimilar(hpToCheck: number): boolean{
    var minHp: number = 0.9 * this.pokemon.card.hp;
    var maxHp: number = 1.1 * this.pokemon.card.hp;
    if(hpToCheck >= minHp && hpToCheck <= maxHp){
      return true
    }
    else {
      return false
    }
  }
  navigateToPockemon(pokemonId: number){
    this.similarPokemonClicked.emit();
    this.router.navigate(['/pokedex',pokemonId]);
  }
}
