import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  players: Array<Object>;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.players = this.dataService.getRankings();
  }

}
