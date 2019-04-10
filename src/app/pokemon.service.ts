import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, Card } from './models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl: string = 'https://api.pokemontcg.io/v1/';

  constructor(
    private httpClient: HttpClient
  ) { }

  async getAllPokemons(){

    let param = new HttpParams()
    .set('page', '0')
    .set('pageSize', '20')
    
    return await this.httpClient.get<Page>( this.baseUrl + 'cards', {params:param}).toPromise();
  }

  async getPokemonById(pokemonID: string){
  
    return await this.httpClient.get<Card>(this.baseUrl + 'cards/' + pokemonID).toPromise();
  }
}
