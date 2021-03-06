import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonService } from './pokemon.service';
import { UtilService } from './util.service';

const appRoutes: Routes = [
  { path: 'pokedex', component: PokemonsListComponent},
  { path: 'pokedex/:id', component: PokemonsListComponent},
  { path: '', redirectTo: '/pokedex', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    PokemonDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    PokemonService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
