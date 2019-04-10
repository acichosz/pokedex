import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Page } from '../models';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  pokemonsList = new Page();
  constructor(
    private pokemonService: PokemonService,
  ) { }

  async ngOnInit() {
    await this.getPokemonsList();
  }

  async getPokemonsList(){
    console.log('getPok');
    
    try {
      this.pokemonsList = await this.pokemonService.getAllPokemons();
    } 
    catch (error) {
      console.log('error');
      
    }
  }

}
