import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.page.html',
  styleUrls: ['./poke-detail.page.scss'],
})
export class PokeDetailPage implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
