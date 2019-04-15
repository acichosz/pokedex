import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, Card } from './models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl: string = 'https://api.pokemontcg.io/v1/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getPokemons(page: number, pageSize: number, rarityFilter: string = '', typeFilter: string = '', minHP: string = ''){
    let url: string = this.baseUrl + 'cards';
    let param = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('supertype', 'Pokémon')
    .set('rarity', rarityFilter)
    .set('types', typeFilter)
    .set('hp', minHP)

    return await this.httpClient.get<Page>( url, {params:param, observe: 'response'}).toPromise();
  }

  async getPokemonById(pokemonID: string){
    let url: string = this.baseUrl + 'cards/' + pokemonID;
    return await this.httpClient.get<Card>(url).toPromise();
  }
}
