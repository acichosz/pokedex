import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { UtilService } from '../util.service';
declare let $;

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit, OnDestroy {
  pokemonsList: Pokemon[] = [];
  pageNumber: number = 0;
  elementsOnPage: number = 20;
  totalElementsNumber = null;

  @ViewChild(PokemonDetailsComponent) pokemonDetails: PokemonDetailsComponent;

  constructor(
    private pokemonService: PokemonService,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.getPokemonsList();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== null){
      await this.showPokemonDetails(id);
    }
    $(window).scroll( async loadMore => {
      if(this.isScrolled()){
        this.pageNumber += 1;
        if( (this.elementsOnPage * (this.pageNumber)) < this.totalElementsNumber ){
          await this.getPokemonsList();
        }
      }
    }); 
  }

  isScrolled() {
    let docHeight = $(document).height();
    let scroll    = $(window).height() + $(window).scrollTop();
    return (docHeight == scroll);
  }

  ngOnDestroy() {
    $(window).unbind('scroll');
  }

  async getPokemonsList(){
    this.utilService.spinnerStart();
    try {
      let result: any = await this.pokemonService.getPokemons(this.pageNumber, this.elementsOnPage);
      this.totalElementsNumber = result.headers.get('Total-Count');
      result.body.cards.forEach(card => {
        this.pokemonsList.push(card)
      });
      this.utilService.spinnerStop();
    } 
    catch (error) {
      this.utilService.spinnerStop();
    }
  }
  addIdToUrl(id: string){
    this.utilService.addIdToUrl(id); 
  }
  removeIDFromUrl(){
    this.utilService.removeIDFromUrl(); 
  }

  async showPokemonDetails(id: string){
    await this.pokemonDetails.setPokemon(id);
    $('#pokemonDetailsModal').modal('show');
  }
}
