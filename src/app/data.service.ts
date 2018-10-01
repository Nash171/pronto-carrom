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
      { id: 1, name: 'Oshan', points: -3 },
      { id: 2, name: 'Nalinda', points: 3 },
      { id: 3, name: 'Harsha', points: 0 },
      { id: 4, name: 'Kasun', points: -12 },
      { id: 5, name: 'Dinith', points: 0 },
      { id: 6, name: 'Chathura', points: 12 },
      { id: 7, name: 'Mahesh', points: 2 },
      { id: 8, name: 'Chamitha', points: -5 },
      { id: 9, name: 'Nadeesh', points: 3 },
      { id: 10, name: 'Hirantha', points: 18 },
      { id: 11, name: 'Ishan', points: -3 },
      { id: 12, name: 'Anuradha', points: -15 },
    ].sort(function(a, b) {
      return b.points - a.points;
    }).map(function(p, i) {
      p['rank'] = prev == p.points ? rank : (rank = i+1);
      prev = p.points;
      return p;
    });
  }
}
