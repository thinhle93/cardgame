import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {
  player: any;

  constructor(private _http: HttpClient) { }
  
  addNewPlayer(player){
    return this._http.post('/player', player)
  }

  startgame(){
    return this._http.get('/startgame')
  }

}
