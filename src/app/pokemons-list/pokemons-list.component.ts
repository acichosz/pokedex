import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Page, Pokemon } from '../models';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
declare var $;

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit, OnDestroy {
  pokemonsList: Pokemon[] = [];
  selectedPokemonId: string = null;
  pageNumber: number = 0;
  lastRequestElementsNumber = null;
  @ViewChild(PokemonDetailsComponent) pokemonDetailsComponent : PokemonDetailsComponent;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  async ngOnInit() {
    $(window).scroll( async loadMore => {
      if(isMyStuffScrolling()){
        this.pageNumber += 1;
        if( this.lastRequestElementsNumber == 20 ){
          await this.getPokemonsList();
        }
      }
    }); 
    
    function isMyStuffScrolling() {
      var docHeight = $(document).height();
      var scroll    = $(window).height() + $(window).scrollTop();
      return (docHeight == scroll);
    }
    await this.getPokemonsList();
  }
  ngOnDestroy() {
    $(window).unbind('scroll');
  }

  async getPokemonsList(){
    this.pokemonService.spinnerStart();
    try {
      var result: Page = await this.pokemonService.getPokemons(this.pageNumber, 20 , '', '');
      this.lastRequestElementsNumber = result.cards.length;
      result.cards.forEach(card => {
        this.pokemonsList.push(card)
      });
      this.pokemonService.spinnerStop();
    } 
    catch (error) {
      this.pokemonService.spinnerStop();
    }
  }

  async showPokemonDetails(id: string){
    await this.pokemonDetailsComponent.getPokemon(id);
    $('#pokemonDetailsModal').modal('show');
  }
  onSimilarPokemonClicked(){
    $('#pokemonDetailsModal').modal('hide');
  }

}
