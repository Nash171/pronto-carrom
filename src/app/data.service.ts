import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  players = [
    { id: 1, name: 'Oshan', rating: 980, w: 0, l: 1, d: 1 },
    //{ id: 2, name: 'Nalinda', rating: 1000, w: 2, l: 2, d: 0 },
    { id: 3, name: 'Harsha', rating: 1020, w: 2, l: 1, d: 1 },
    { id: 4, name: 'Kasun', rating: 980, w: 0, l: 1, d: 1 },
    { id: 5, name: 'Dinith', rating: 1000, w: 1, l: 1, d: 1 },
    { id: 6, name: 'Chathura', rating: 1000, w: 1, l: 2, d: 0 },
    { id: 7, name: 'Mahesh', rating: 1040, w: 3, l: 2, d: 0 },
    { id: 8, name: 'Chamitha', rating: 980, w: 0, l: 2, d: 0 },
    { id: 9, name: 'Nadeesh', rating: 1060, w: 5, l: 0, d: 0 },
    { id: 10, name: 'Hirantha', rating: 1000, w: 2, l: 1, d: 0 },
    { id: 11, name: 'Ishan', rating: 980, w: 0, l: 2, d: 0 },
    { id: 12, name: 'Anuradha', rating: 1000, w: 1, l: 2, d: 0 },
  ];

  old_matches = [
    { id: 1, playerA: 1, playerB: 2, scoreA: 1, scoreB: 4, frames: 2},
    { id: 2, playerA: 4, playerB: 5, scoreA: 5, scoreB: 5, frames: 2},
    { id: 3, playerA: 7, playerB: 8, scoreA: 5, scoreB: 0, frames: 2},
    { id: 4, playerA: 10, playerB: 11, scoreA: 7, scoreB: 4, frames: 2},
    { id: 5, playerA: 1, playerB: 3, scoreA: 4, scoreB: 4, frames: 2},
    { id: 6, playerA: 4, playerB: 6, scoreA: 0, scoreB: 12, frames: 2},
    { id: 7, playerA: 7, playerB: 9, scoreA: 1, scoreB: 4, frames: 2},
    { id: 8, playerA: 10, playerB: 12, scoreA: 15, scoreB: 0, frames: 2},
    { id: 9, playerA: 2, playerB: 3, scoreA: 0, scoreB: 8, frames: 2},
    { id: 10, playerA: 5, playerB: 6, scoreA: 7, scoreB: 6, frames: 2},
    { id: 11, playerA: 8, playerB: 9, scoreA: 0, scoreB: 11, frames: 2},
    { id: 12, playerA: 11, playerB: 12, scoreA: 0, scoreB: 9, frames: 2},
    //quater
    { id: 13, playerA: 3, playerB: 6, scoreA: 12, scoreB: 0, frames: 2},
    { id: 14, playerA: 7, playerB: 10, scoreA: 6, scoreB: 2, frames: 2},
    //{ id: 15, playerA: 2, playerB: 5, scoreA: 3, scoreB: 1, frames: 2},
    { id: 16, playerA: 9, playerB: 12, scoreA: 8, scoreB: 0, frames: 2},
    //semi
    { id: 13, playerA: 7, playerB: 2, scoreA: 6, scoreB: 5, frames: 2},
    { id: 14, playerA: 9, playerB: 3, scoreA: 8, scoreB: 4, frames: 2},
    //final
    { id: 15, playerA: 9, playerB: 7, scoreA: 14, scoreB: 0, frames: 3},
  ]

  matches = []

  getRankings(): Array<Object> {
    this.matches.map(function(match){
      var newRatingA = this.getNewRating(
        this.players[match.playerA-1].rating,
        this.players[match.playerB-1].rating,
        match.scoreA > match.scoreB ? 1 : match.scoreA < match.scoreB ? 0 : 0.5,
        Math.abs(match.scoreA-match.scoreB),
        match.frames
      );

      var newRatingB = this.getNewRating(
        this.players[match.playerB-1].rating,
        this.players[match.playerA-1].rating,
        match.scoreB > match.scoreA ? 1 : match.scoreB < match.scoreA ? 0 : 0.5,
        Math.abs(match.scoreA-match.scoreB),
        match.frames
      );

      this.players[match.playerA-1].rating = newRatingA;
      this.players[match.playerB-1].rating = newRatingB;

      if(match.scoreA > match.scoreB){
        this.players[match.playerA-1].w++;
        this.players[match.playerB-1].l++;
      }
      else if(match.scoreA < match.scoreB){
        this.players[match.playerA-1].l++;
        this.players[match.playerB-1].w++;
      }
      else{
        this.players[match.playerA-1].d++;
        this.players[match.playerB-1].d++;
      }
    }, this);

    var prev = 0;
    var rank = 0;

    return this.players.sort(function(a, b) {
      return b.rating - a.rating;
    }).map(function(p, i) {
      p['rank'] = (prev==p.rating) ? rank : (rank = i+1);
      prev = p.rating;
      return p;
    });
  }

  getRatingDelta(myRating, opponentRating, myGameResult, scoreDiff, frames) {
    if ([0, 0.5, 1].indexOf(myGameResult) === -1) {
      return null;
    }

    var myChanceToWin = 1 / ( 1 + Math.pow(10, (opponentRating - myRating) / 400));
    return Math.round(24 * (myGameResult - myChanceToWin) * (1 + scoreDiff/(12*frames)));
  }

  getNewRating(myRating, opponentRating, myGameResult, scoreDiff, frames) {
    return myRating + this.getRatingDelta(myRating, opponentRating, myGameResult, scoreDiff, frames);
  }
}
