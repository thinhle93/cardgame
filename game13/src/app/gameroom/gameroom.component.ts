import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css']
})
export class GameroomComponent implements OnInit {
  player: any;
  constructor(private _httpService: HttpService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.player = this._httpService.player;
    console.log(this.player)
    console.log(this._httpService.player)
  
  }


  
}
