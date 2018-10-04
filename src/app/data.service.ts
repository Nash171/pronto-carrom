import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getRankings(): Array<Object> {
    var prev = 0;
    var rank = 1;
    return [
      { id: 1, name: 'Oshan', points: -3, matches: 2, win: 0, loss: 1, draw: 1, rating: 0 },
      { id: 2, name: 'Nalinda', points: -5, matches: 2, win: 1, loss: 1, draw: 0, rating: 0 },
      { id: 3, name: 'Harsha', points: 8, matches: 2, win: 1, loss: 0, draw: 1, rating: 0 },
      { id: 4, name: 'Kasun', points: -12, matches: 2, win: 0, loss: 1, draw: 1, rating: 0 },
      { id: 5, name: 'Dinith', points: 7, matches: 2, win: 1, loss: 0, draw: 1, rating: 0 },
      { id: 6, name: 'Chathura', points: 11, matches: 2, win: 1, loss: 1, draw: 0, rating: 0 },
      { id: 7, name: 'Mahesh', points: 2, matches: 2, win: 1, loss: 1, draw: 0, rating: 0 },
      { id: 8, name: 'Chamitha', points: -16, matches: 2, win: 0, loss: 2, draw: 0, rating: 0 },
      { id: 9, name: 'Nadeesh', points: 14, matches: 2, win: 2, loss: 0, draw: 0, rating: 0 },
      { id: 10, name: 'Hirantha', points: 18, matches: 2, win: 2, loss: 0, draw: 0, rating: 0 },
      { id: 11, name: 'Ishan', points: -12, matches: 2, win: 0, loss: 2, draw: 0, rating: 0 },
      { id: 12, name: 'Anuradha', points: -6, matches: 2, win: 1, loss: 1, draw: 0, rating: 0 },
    ].map(function(p){
      p['rating'] = (p.win*2 + p.draw*1)/p.matches;
      return p;
    }).sort(function(a, b) {
      return (b.rating - a.rating)||(b.points - a.points);
    }).map(function(p, i) {
      p['rank'] = prev == p.points ? rank : (rank = i+1);
      prev = p.points;
      return p;
    });
  }
}
