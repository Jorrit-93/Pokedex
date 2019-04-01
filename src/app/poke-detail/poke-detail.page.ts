import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from '../poke-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.page.html',
  styleUrls: ['./poke-detail.page.scss'],
})
export class PokeDetailPage {
  public id: string;

  public detailObservable: Observable<any>;
  public detailArray = Array<any>();
  public detailUpdate = function(){};

  constructor(private route: ActivatedRoute, private pokeAPI: PokeAPIService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initObservable();
    this.getDetail();
  }

  initObservable(){
    this.detailObservable = new Observable(observed => {
      this.detailUpdate = function() {
        observed.next(this.detailArray);
      };
    });
  }

  getDetail() {
    this.pokeAPI.findPokemon(this.id).then(data => {
      this.detailArray = data;
      this.detailUpdate();
    });
  }
}
