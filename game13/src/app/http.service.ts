import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:8000';


@Injectable()
export class HttpService {
  player: any;
  private socket;


  constructor(private _http: HttpClient) { }
  
  addNewPlayer(player){
    return this._http.post('/player', player)
  }

  startgame(){
    return this._http.get('/startgame')
  }


  broadcast(){
    //console.log(message)
    this.socket.emit("broadcasting")
    
  }

  onBroadcast(){
    return new Observable<object>(observer => {
      this.socket.on('broadcast');
    });
  }
  initSocket() {
    this.socket = io(SERVER_URL);
  }

  send(message) {
    this.socket.emit('message', message);
  }

  onMessage() {
    return new Observable<object>(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  onEvent(event) {
    return new Observable<object>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  oninitial(){
    return new Observable<object>(observer => {
      this.socket.on('initial', (data) => observer.next(data));
    });
  }
}


