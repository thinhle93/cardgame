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
  allPlayers: any;
  listenbroadcast: any;
  // ioConnection: any;
  // io;
  constructor(private _httpService: HttpService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) {
    this.listenbroadcast = this._httpService.onBroadcast().subscribe(() => {
      console.log("in gameroom component")
    });
   }

  ngOnInit() {
    this.player = this._httpService.player;
    //console.log(this.player)
    //console.log(this._httpService.player)


    
   
  }

  startgame(){
    let observable = this._httpService.startgame()
    observable.subscribe(data =>{
      console.log("in gameroom component")
      this.allPlayers = data["data"]
      console.log("123asdfasdfa12312312",this.allPlayers)
    })
    
  }

  play(){
    let play = this._httpService.broadcast();
    
  }

  



  // private initToConnection() {
  //   this._httpService.initSocket();

  //   this._httpService.onEvent('connect').subscribe(() => {
  //     console.log('You are connected!');
  //   });

  //   this._httpService.onEvent('other:connection').subscribe(() => {
  //     console.log('Somebody else connected!');
  //   });

  //   this._httpService.onEvent('disconnect').subscribe(() => {
  //     console.log('Somebody disconnected!');
  //   });

  // }
}
