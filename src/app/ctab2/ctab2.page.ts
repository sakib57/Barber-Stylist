import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ctab2',
  templateUrl: './ctab2.page.html',
  styleUrls: ['./ctab2.page.scss'],
})
export class Ctab2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event) {
    console.log(event);
  }
}
