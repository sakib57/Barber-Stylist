import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ctab3',
  templateUrl: './ctab3.page.html',
  styleUrls: ['./ctab3.page.scss'],
})
export class Ctab3Page implements OnInit {
  resultsAvailable: boolean = false;
  results: string[] = [];
  ignoreNextChange: boolean = false;
  supplier: any;
  constructor() { }

  ngOnInit() {
  }
  onSearchChange(event: any) {
    const substring = event.target.value;
    if (this.ignoreNextChange) {
      this.ignoreNextChange = false;
      return;
    }

    // this.dataService.getStrings(substring).subscribe((result) => {
    //   this.results = result;
    //   if (this.results.length > 0) {
    //     this.resultsAvailable = true;
    //   } else {
    //     this.resultsAvailable = false;
    //   }
    // });
  }

  supplierSelected(selected: string): void {
    this.supplier = selected;
    this.results = [];
    this.resultsAvailable = false;
    this.ignoreNextChange = true;
  }
}
