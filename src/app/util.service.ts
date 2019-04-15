import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isSpinnerVisible: boolean = true;

  constructor(
    private location: Location
  ) { }
  
  spinnerStart(){
    this.isSpinnerVisible = true;
  }
  spinnerStop(){
    this.isSpinnerVisible = false;
  }
  addIdToUrl(id: string){
    this.location.go(this.location.path() +'/' + id); 
  }
  removeIDFromUrl(){
    this.location.go(this.location.path().split('/')[1]);
  }
}
