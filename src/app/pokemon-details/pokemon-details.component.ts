import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon = new Card();
  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.getPokemon(id);
  }

  async getPokemon(id: string){
    try {
      this.pokemon = await this.pokemonService.getPokemonById(id);
    }
    catch (error)
    {
      
    }
  }
}
