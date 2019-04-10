import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { HomeComponent } from './home/home.component';
import { PokemonService } from './pokemon.service';

const appRoutes: Routes = [
  { path: 'pokedex', component: HomeComponent },
  { path: 'pokemons', component: PokemonsListComponent },
  { path: 'pokemons/:id', component: PokemonDetailsComponent },
  { path: '',
    redirectTo: '/pokedex',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    PokemonDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
