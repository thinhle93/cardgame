import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newPlayer: any;
  constructor(private _httpService: HttpService,
  private _router: Router, 
  private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newPlayer = {name: ""}
  }
  addNewPlayer(name){
    this.newPlayer.name = name //need this line to get name from the html
    let observable = this._httpService.addNewPlayer(this.newPlayer)
    observable.subscribe(data =>{
      console.log("123123123", data)

    })
  }
}
