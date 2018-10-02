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
      { id: 1, name: 'Oshan', points: -3, frames: 4 },
      { id: 2, name: 'Nalinda', points: -5, frames: 4 },
      { id: 3, name: 'Harsha', points: 8, frames: 4 },
      { id: 4, name: 'Kasun', points: -12, frames: 4 },
      { id: 5, name: 'Dinith', points: 0, frames: 2 },
      { id: 6, name: 'Chathura', points: 12, frames: 2 },
      { id: 7, name: 'Mahesh', points: 2, frames: 4 },
      { id: 8, name: 'Chamitha', points: -16, frames: 4 },
      { id: 9, name: 'Nadeesh', points: 14, frames: 4 },
      { id: 10, name: 'Hirantha', points: 18, frames: 4 },
      { id: 11, name: 'Ishan', points: -3, frames: 2 },
      { id: 12, name: 'Anuradha', points: -15, frames: 2 },
    ].sort(function(a, b) {
      return b.points - a.points;
    }).map(function(p, i) {
      p['rank'] = prev == p.points ? rank : (rank = i+1);
      prev = p.points;
      return p;
    });
  }
}
